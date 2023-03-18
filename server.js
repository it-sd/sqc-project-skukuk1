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

const getProfilesQuery = async function () {
  const result = await query('SELECT * FROM account;', [])

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
  getMangasQuery,
  getProfilesQuery
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
  .post('/newContact', async function (req, res) {
    res.set({ 'Content-Type': 'application/json' })
    try {
      const client = await pool.connect()

      const firstName = req.body.firstName
      const lastName = req.body.lastName
      const email = req.body.email
      const subject = req.body.subject
      const message = req.body.message

      if (message === null || message === '') {
        res.status(400).send('Server Error')
        res.end()
      } else {
        const insertContactSql = "INSERT INTO contact (first_name, last_name, email, subject, message) VALUES('" + firstName + "', '" + lastName + "', '" + email + "', '" + subject + "', '" + message + "');"

        await client.query(insertContactSql)

        res.json({ ok: true })
        client.release()
      }
    } catch (error) {
      console.error('Invalid Entry')
      res.status(400).json({ ok: false })
    }
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
  .get('/account', (req, res) => {
    res.render('pages/account')
  })
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
  .get('/profile', async function (req, res) {
    const resultsProfile = await getProfilesQuery()
    res.render('pages/profile', { profiles: resultsProfile.result })
  })
  .get('/addAnime', function (req, res) {
    res.render('pages/addAnime')
  })
  .get('/getAnimes', async function (req, res) {
    const resultsAnime = await getAnimesQuery()
    res.status(200).json({ animes: resultsAnime.result })
  })
  .post('/newAnime', async function (req, res) {
    res.set({ 'Content-Type': 'application/json' })
    try {
      const client = await pool.connect()

      const animeName = req.body.animeName
      const animeStudio = req.body.animeStudio
      const genre = req.body.genre
      const rating = req.body.rating
      const synopsis = req.body.synopsis
      console.log(animeName, animeStudio, genre, rating, synopsis)

      if (animeName === null || animeName === '') {
        res.status(400).send('Server Error')
        res.end()
      } else {
        const insertAnimeSql = "INSERT INTO anime_list (anime_name, studio, genre, personal_rating, synopsis) VALUES('" + animeName + "', '" + animeStudio + "', '" + genre + "', '" + rating + "', '" + synopsis + "');"

        await client.query(insertAnimeSql)

        res.json({ ok: true })
        client.release()
      }
    } catch (error) {
      console.error('Invalid Entry')
      res.status(400).json({ ok: false })
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
    res.set({ 'Content-Type': 'application/json' })
    try {
      const client = await pool.connect()

      const mangaName = req.body.mangaName
      const mangaAuthor = req.body.mangaAuthor
      const genre = req.body.genre
      const rating = req.body.rating
      const synopsis = req.body.synopsis
      console.log(mangaName, mangaAuthor, genre, rating, synopsis)

      if (mangaName === null || mangaName === '') {
        res.status(400).send('Server Error')
        res.end()
      } else {
        const insertMangaSql = "INSERT INTO manga_list (manga_name, author, genre, personal_rating, synopsis) VALUES('" + mangaName + "', '" + mangaAuthor + "', '" + genre + "', '" + rating + "', '" + synopsis + "');"

        await client.query(insertMangaSql)

        res.json({ ok: true })
        client.release()
      }
    } catch (error) {
      console.error('Invalid Entry')
      res.status(400).json({ ok: false })
    }
  })
  .get('/search', (req, res) => {
    res.render('pages/search')
  })
  .post('/searchTitle', async function (req, res) {
    const title = req.body.title
    const apiKey = process.env.apiKeyWatchMode
    const url = `https://api.watchmode.com/v1/list-titles/${title}/?apiKey=${apiKey}&source_ids=203,57`

    const response = await fetch(url, {
      method: 'GET',
      headers: {}
    })

    const result = await response.json()

    res.json({ ID: result.id, Title: result.title, Year: result.year, Type: result.type })
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
