// const fetch = require('node-fetch')
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import assert from 'assert'
import pg from 'pg'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const { Pool } = pg
dotenv.config()

const PORT = process.env.PORT || 5163

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
  const result = await query('SELECT * FROM anime_list LIMIT 1;', [])

  let status = 200
  let msg = 'healthy'

  if (result === undefined || result.length === 0) {
    status = 500
    msg = 'unhealthy'
  }
  return { status, msg }
}

const getAnimesQuery = async function () {
  const result = await query('SELECT * FROM anime_list;', [])

  let status = 200
  let msg = 'healthy'

  if (result === undefined || result.length === 0) {
    status = 500
    msg = 'unhealthy'
  }
  return { status, msg, result }
}

const getMangasQuery = async function () {
  const result = await query('SELECT * FROM manga_list;', [])

  let status = 200
  let msg = 'healthy'

  if (result === undefined || result.length === 0) {
    status = 500
    msg = 'unhealthy'
  }
  return { status, msg, result }
}

export {
  query,
  healthyQuery,
  getAnimesQuery,
  getMangasQuery
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', function (req, res) {
    res.render('pages/index')
  })
  .get('/about', function (req, res) {
    res.render('pages/about')
  })
  .get('/health', async function (req, res) {
    const result = await healthyQuery()
    res.status(result.status).send(result.msg)
  })
  .get('/lists', async function (req, res) {
    const resultsAnime = await getAnimesQuery()
    const resultsManga = await getMangasQuery()
    res.render('pages/lists', { animes: resultsAnime.result, mangas: resultsManga.result })
  })
  .get('/addAnime', function (req, res) {
    res.render('pages/addAnime')
  })
  .get('/getAnimes', async function (req, res) {
    const resultsAnime = await getAnimesQuery()
    res.status(200).json({ animes: resultsAnime.result })
  })
  .post('/newAnime', async function (req, res) {
    const { animeName, studio, genre, personalRating, synopsis } = req.body
    console.log(animeName, studio, genre, personalRating, synopsis)
    if (animeName === null || animeName === '') {
      res.status(400).send('Bad Request')
      res.end()
    } else {
      const sql = 'INSERT INTO anime_list (animeName, studio, genre, personalRating, synopsis) VALUES ($1, $2, $3, $4, $5);'
      const params = [animeName, studio, genre, personalRating, synopsis]
      const animeResult = await query(sql, params)
      res.status(200).json({ animeResult })
    }
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
