'use strict'

const express = require('express')
const cors = require('cors')
const pg = require('pg')

// the ||'s are local dev setups.s
const app = express()
const PORT = process.env.PORT || 3000
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:8080'

const client = new pg.Client(process.env.DATABASE_URL || 'postgres://postgres:Mt145824@localhost:5432/book_app' )
client.connect()
client.on('error', err => console.error(err))

app.use(cors())

app.get('/test', (req, res) => {
  console.log('route was hit')
  res.send('test was a success!') 
})
app.get('/books', (req, res) => {
  console.log('books was hit')
  client.query(`
    SELECT * FROM BOOKS;
  `).then( data => res.send(data.rows))
})



app.listen(PORT, () => console.log(`listening on port :${PORT}`) )