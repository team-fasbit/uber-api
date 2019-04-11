const Router = require('koa-router');
const router = new Router();
const walletRouter = require('./wallet');
router.get('/v1', ctx => ctx.body = { "statusCode": 500, "statusText": "API WORKS", "success": true });
router.use('/v1/wallet', walletRouter.routes())
module.exports = router;