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

  // This is where the create account functionaily starts
  // start by just loading new page that I created called account
  .get('/account', (req, res) => {
    res.render('pages/account')
  })

  // This is the post method for the account page, it is called newAccount
  // creates a post request and talks to account.ejs
  // gets data entered in input form from ejs and sends to database table called account
  .post('/newAccount', async function (req, res) {
    res.set({ 'Content-Type': 'application/json' })
    try {
      const client = await pool.connect()

      const accountName = req.body.accountName
      const ownerName = req.body.ownerName
      const email = req.body.email
      const phone = req.body.phone
      const interests = req.body.interests

      if (accountName === null || accountName === '') {
        res.status(400).send('Server Error')
        res.end()
      } else {
        const insertSql = "INSERT INTO account (account_name, owner_name, email, phone, interest) VALUES('" + accountName + "', '" + ownerName + "', '" + email + "', '" + phone + "', '" + interests + "');"

        await client.query(insertSql)

        res.json({ ok: true })
        client.release()
      }
    } catch (error) {
      console.error('Invalid Entry')
      res.status(400).json({ ok: false })
    }
  })
  // End of create account functionality and code

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
      const insertAnimeSql = 'INSERT INTO anime_list (anime_name, studio, genre, personal_rating, synopsis) VALUES ($1, $2, $3, $4, $5);'
      const animeParams = [animeName, studio, genre, personalRating, synopsis]
      const animeResult = await query(insertAnimeSql, animeParams)
      res.status(200).json({ animeResult })
    }
  })
  .get('/addManga', function (req, res) {
    res.render('pages/addManga')
  })
  .get('/getMangas', async function (req, res) {
    const resultsManga = await getMangasQuery()
    res.status(200).json({ mangas: resultsManga.result })
  })
  .post('/newManga', async function (req, res) {
    const { mangaName, author, genre, personalRating, synopsis } = req.body
    console.log(mangaName, author, genre, personalRating, synopsis)
    if (mangaName === null || mangaName === '') {
      res.status(400).send('Bad Request')
      res.end()
    } else {
      const insertMangaSql = 'INSERT INTO manga_list (manga_name, author, genre, personal_rating, synopsis) VALUES ($1, $2, $3, $4, $5);'
      const mangaParams = [mangaName, author, genre, personalRating, synopsis]
      const animeResult = await query(insertMangaSql, mangaParams)
      res.status(200).json({ animeResult })
    }
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
