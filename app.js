const Koa = require('koa');
const app = new Koa();
const logger = require('koa-logger');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
require('dotenv').config();
require('./models')
const router = require('./routes');
app.use(logger());
app.use(bodyParser());
app.use(async (ctx, next) => {
    ctx.mongoose = mongoose;
    ctx.sendResponse = (body, message, code) => {
        return ctx.body = {
            statusCode: code,
            statusText: message,
            success: true,
            body: body
        };
    };
    try {
        await next();
        if (ctx.status === 404) throw new Error('Page not Found');
    } catch (err) {
        return ctx.app.emit('error', err, ctx);
    }
});

app.on('error', (err, ctx) => {
    console.log('ERROR = ', err)
    return ctx.body = {
        statusCode: err.status || 500,
        statusText: err.message,
        success: false,
        body: err.stack
    };
});

app.use(router.routes());
app.use(router.allowedMethods());
connectDB = () => {
    return mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(() => {
        console.log('CONNECTED');
    }).catch(() => {
        console.log('RECONNECTING DB');
        return setTimeout(connectDB, 3000);
    })
}
connectDB().then(() => app.listen(process.env.APP_PORT))