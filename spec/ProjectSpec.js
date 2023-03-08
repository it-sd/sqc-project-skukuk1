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
