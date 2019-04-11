const Router = require('koa-router');
const router = new Router();
const { walletController } = require('../../../controllers/users');
router.get('/createAddress', walletController.createAddress);
router.get('/getBalance/:address', walletController.getBalance);
router.post('/transaction/:address', walletController.transact);
router.get('/transactions', walletController.getTransactions);
router.get('/getMarketPrice', walletController.getMarketPrice);
module.exports = router;