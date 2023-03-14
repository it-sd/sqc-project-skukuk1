import { healthyQuery, getAnimesQuery, getMangasQuery } from '../server.js'

const baseUrl = 'http://localhost:5163'
describe('healthyQuery', function () {
  it('should return an HTTP response between 200 & 399', async function () {
    const result = await healthyQuery()
    expect(result.status).toBeGreaterThanOrEqual(200)
    expect(result.status).toBeLessThanOrEqual(399)
  })
})

describe('getAnimesQuery', function () {
  it('should return an HTTP response between 200 & 399', async function () {
    const result = await getAnimesQuery()
    expect(result.status).toBeGreaterThanOrEqual(200)
    expect(result.status).toBeLessThanOrEqual(399)
  })
})

describe('getMangasQuery', function () {
  it('should return an HTTP response between 200 & 399', async function () {
    const result = await getMangasQuery()
    expect(result.status).toBeGreaterThanOrEqual(200)
    expect(result.status).toBeLessThanOrEqual(399)
  })
})

describe('GET /', function () {
  it('should return a status between 200 & 399', async function () {
    const result = await fetch(baseUrl)
    expect(result.status).toBeGreaterThanOrEqual(200)
    expect(result.status).toBeLessThanOrEqual(399)
  })
})

describe('getAnimes Fetch', function () {
  it('should return a status between 200 & 399 and give a list of animes', async function () {
    const result = await fetch(baseUrl + '/getAnimes')
    expect(result.status).toBeGreaterThanOrEqual(200)
    expect(result.status).toBeLessThanOrEqual(399)
    const body = await result.json()
    expect(body.animes).toBeDefined()
  })
})
// Test lmarquardt7 added for account page
describe('GET /account', function () {
  it('should return a status between 200 & 399', async function () {
    const result = await fetch(baseUrl)
    expect(result.status).toBeGreaterThanOrEqual(200)
    expect(result.status).toBeLessThanOrEqual(399)
  })
})
describe("POST '/newAccount'", function () {
  const url = new URL('/newAccount', baseUrl)
  it('should accept valid account information and send to database', async function () {
    const data = {
      accountName: 'jasmineTestAccount',
      ownerName: 'jasmineTestOwner',
      email: 'jasmine@TestEmail',
      phone: '123-456-7890',
      interests: 'jasmineTestInterests'
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    expect(response.ok).toBeTrue()

    const results = await response.json()
    expect(results.ok).toBeTrue()
  })
  it('should not send information to database if accountName is null', async function () {
    const data = {
      accountName: '',
      ownerName: '',
      email: '',
      phone: '',
      interests: ''
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    expect(response.ok).toBeFalse()
  })
})
