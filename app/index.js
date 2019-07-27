const express = require('express')
const Blockchain = require('../blockchain')

const app = express()
const HTTP_PORT = process.env.HTTP_PORT || 3001

const blockchain = new Blockchain()

app.get('/blocks', (req, res) => {
    res.json(blockchain.chain)
})

app.listen(HTTP_PORT, () => console.log(`Example app listening on port ${HTTP_PORT} !`))