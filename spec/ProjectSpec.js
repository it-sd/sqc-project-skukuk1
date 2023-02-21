const {
  healthyQuery,
  getAnimeQuery
} = require('../server.js')

describe('healthyQuery', function () {
  it('should return an HTTP response between 200 & 399', async function () {
    const result = await healthyQuery()
    expect(result.status).toBeGreaterThanOrEqual(200)
    expect(result.status).toBeLessThanOrEqual(399)
  })
})

describe('getAnimeQuery', function () {
  it('should return an HTTP response between 200 & 399', async function () {
    const result = await getAnimeQuery()
    expect(result.status).toBeGreaterThanOrEqual(200)
    expect(result.status).toBeLessThanOrEqual(399)
  })
})
