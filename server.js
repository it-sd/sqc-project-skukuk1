require('dotenv').config()

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5163
const assert = require('assert')
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const query = async function (sql, params) {
  assert.strictEqual(typeof sql, 'string',
    'Expected src to be a string')
  let client
  let results = []
  try {
    client = await pool.connect()
    const response = await client.query(sql, params)
    if (response && response.rows) {
      results = response.rows
    }
  } catch (err) {
    console.error(err)
  }
  if (client) client.release()
  return results
}

const healthyQuery = async function () {
  const result = await query('SELECT * FROM anime LIMIT 1;')

  let status = 200
  let msg = 'healthy'

  if (result === undefined || result.length === 0) {
    status = 500
    msg = 'unhealthy'
  }
  return { status, msg }
}

const getAnimeQuery = async function () {
  const result = await query('SELECT * FROM anime;')

  let status = 200
  let msg = 'healthy'

  if (result === undefined || result.length === 0) {
    status = 500
    msg = 'unhealthy'
  }
  return { status, msg, result }
}

module.exports = {
  query,
  healthyQuery,
  getAnimeQuery
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', async function (req, res) {
    const result = await getAnimeQuery()
    res.render('pages/index', { animes: result.results })
  })
  .get('/about', function (req, res) {
    res.render('pages/about')
  })
  .get('/health', async function (req, res) {
    const result = await healthyQuery()
    res.status(result.status).send(result.msg)
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
