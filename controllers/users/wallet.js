const tronweb = require('tronweb');
const request = require('request');
const HttpProvider = tronweb.providers.HttpProvider;
const fullNode = process.env.FULL_NODE;
const solidityNode = process.env.SOLIDITY_NODE;
const eventServer = process.env.EVENT_SERVER;
const CryptoUtils = require("@tronscan/client/src/utils/crypto");
const TransactionUtils = require("@tronscan/client/src/utils/transactionBuilder");
const Client = require("@tronscan/client").Client;
const client = new Client();
const createAddress = async (ctx, next) => {
    const Wallet = ctx.mongoose.model('Wallet');
    const tronWeb = new tronweb(
        fullNode,
        solidityNode,
        eventServer
    );
    let result = await tronWeb.trx.tronWeb.createAccount();
    let wallet = new Wallet({
        address: result.address.base58
    }).save();
    ctx.body = result;
};
const getBalance = async (ctx, next) => {
    const tronWeb = new tronweb(
        fullNode,
        solidityNode,
        eventServer
    );
    const Wallet = ctx.mongoose.model('Wallet');
    let result = await tronWeb.trx.getBalance(ctx.params.address);
    console.log("RESULT = ", result);
    ctx.body = result;

};
const transact = async (ctx, next) => {
    const body = ctx.request.body;
    const Transaction = ctx.mongoose.model('Transaction');
    let result = await new Promise((rs, rj) => {
        request.post(fullNode + '/wallet/easytransferbyprivate', {
            json: {
                privateKey: body.privateKey,
                toAddress: body.toAddress,
                amount: body.amount
            },
            headers: {
                'Content-Type': 'application/json'
            },
        }, (err, response, body) => {
            if (err) return rj(err);
            new Transaction(body).save().then(console.log).then(console.log)
            rs(body);
        })
    });
    ctx.body = result;
};
const getTransactions = (ctx, next) => {

};
const getMarketPrice = async (ctx, next) => {
    ctx.body = await client.getMarkets();
};
module.exports = {
    createAddress
    , getBalance
    , transact
    , getTransactions
    , getMarketPrice
}