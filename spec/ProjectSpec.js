const {
  healthyQuery,
  getAnimesQuery,
  getMangasQuery
} = require('../server.js')

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
