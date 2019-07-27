const express = require('express')
const bodyParser = require('body-parser')
const Blockchain = require('../blockchain')
const P2pServer = require('./p2pserver')
const Wallet = require('../wallet')
const TransactionPool = require('../wallet/transaction-pool')
const Miner = require('./miner')


const app = express()
const HTTP_PORT = process.env.HTTP_PORT || 3001

const blockchain = new Blockchain()
const wallet = new Wallet()
const p2pServer = new P2pServer(blockchain)
const tp = new TransactionPool()
const miner = new Miner(bc, tp, wallet, p2pServer)

app.use(bodyParser.json())

app.get('/blocks', (req, res) => {
    res.json(blockchain.chain)
})

app.post('/mine', (req, res) => {
    const block = blockchain.addBlock(req.body.data)
    console.log(`New block added: ${block.toString()}`)
    res.redirect(' /blocks')
})

app.get('/transactions', (req, res) => {
    res.json(tp.transactions)
})

app.post('/transact', (res, req) => {
    const { recipient, amount } = req.body;
    const transaction = wallet.createTransaction(recipient, amount, bc , tp);
    p2pServer.broadcastTransaction(transaction);
    res.redirect('/transactions');
})

app.get('/mine-transactions', (req, res) => {
    const block = miner.mine;
    console.log(`New block added: ${block.toString()}`);
    res.redirect('/blocks');
});

app.get('/public-key', (req, res) => {
    res.json({ publicKey: wallet.publicKey });
});


app.listen(HTTP_PORT, () => console.log(`Example app listening on port ${HTTP_PORT} !`))
p2pServer.listen();
