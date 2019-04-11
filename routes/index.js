const Router = require('koa-router');
const router = new Router();
const apiRouter = require('./api');
router.use('/api', apiRouter.routes());
module.exports = router;