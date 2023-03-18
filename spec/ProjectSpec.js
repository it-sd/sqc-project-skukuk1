import { healthyQuery, getAnimesQuery, getMangasQuery, getProfilesQuery } from '../server.js'

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

describe('getProfilesQuery', function () {
  it('should return an HTTP response between 200 & 399', async function () {
    const result = await getProfilesQuery()
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

describe("POST '/newContact'", function () {
  const url = new URL('/newContact', baseUrl)
  it('should accept valid contact information and send to database', async function () {
    const contact = {
      firstName: 'jasmineTestFirstName',
      lastName: 'jasmineTestLastName',
      email: 'jasmine@TestEmail',
      subject: 'Hello',
      message: 'How are you.'
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    })
    expect(response.ok).toBeTrue()

    const results = await response.json()
    expect(results.ok).toBeTrue()
  })
  it('should not send information to database if message is null', async function () {
    const contact = {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: ''
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    })
    expect(response.ok).toBeFalse()
  })
})

describe('GET /about', function () {
  it('should return a status between 200 & 399', async function () {
    const result = await fetch(baseUrl)
    expect(result.status).toBeGreaterThanOrEqual(200)
    expect(result.status).toBeLessThanOrEqual(399)
  })
})

describe('GET /health', function () {
  it('should return a status between 200 & 399', async function () {
    const result = await fetch(baseUrl)
    expect(result.status).toBeGreaterThanOrEqual(200)
    expect(result.status).toBeLessThanOrEqual(399)
  })
})

describe('GET /lists', function () {
  it('should return a status between 200 & 399', async function () {
    const resultsAnime = await fetch(baseUrl)
	expect(resultsAnime.status).toBeGreaterThanOrEqual(200)
    expect(resultsAnime.status).toBeLessThanOrEqual(399)
	const resultsManga = await fetch(baseUrl)
    expect(resultsManga.status).toBeGreaterThanOrEqual(200)
    expect(resultsManga.status).toBeLessThanOrEqual(399)
  })
})

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

describe('GET /profile', function () {
  it('should return a status between 200 & 399', async function () {
    const resultsProfile = await fetch(baseUrl)
    expect(resultsProfile.status).toBeGreaterThanOrEqual(200)
    expect(resultsProfile.status).toBeLessThanOrEqual(399)
  })
})

describe('GET /addAnime', function () {
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

describe("POST '/newAnime'", function () {
  const url = new URL('/newAccount', baseUrl)
  it('should accept valid anime information and send to database', async function () {
    const anime = {
      animeName: '',
      animeStudio: '',
      genre: '',
      rating: '',
      synopsis: ''
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(anime)
    })
    expect(response.ok).toBeTrue()

    const results = await response.json()
    expect(results.ok).toBeTrue()
  })
  it('should not send information to database if animeName is null', async function () {
    const anime = {
      animeName: '',
      animeStudio: '',
      genre: '',
      rating: '',
      synopsis: ''
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(anime)
    })
    expect(response.ok).toBeFalse()
  })
})

describe('GET /addManga', function () {
  it('should return a status between 200 & 399', async function () {
    const result = await fetch(baseUrl)
    expect(result.status).toBeGreaterThanOrEqual(200)
    expect(result.status).toBeLessThanOrEqual(399)
  })
})

describe('getMangas Fetch', function () {
  it('should return a status between 200 & 399 and give a list of mangas', async function () {
    const result = await fetch(baseUrl + '/getMangas')
    expect(result.status).toBeGreaterThanOrEqual(200)
    expect(result.status).toBeLessThanOrEqual(399)
    const body = await result.json()
    expect(body.mangas).toBeDefined()
  })
})

describe("POST '/newManga'", function () {
  const url = new URL('/newManga', baseUrl)
  it('should accept valid manga information and send to database', async function () {
    const manga = {
      mangaName: '',
      mangaAuthor: '',
      genre: '',
      rating: '',
      synopsis: ''
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(manga)
    })
    expect(response.ok).toBeTrue()

    const results = await response.json()
    expect(results.ok).toBeTrue()
  })
  it('should not send information to database if mangaName is null', async function () {
    const manga = {
      mangaName: '',
      mangaAuthor: '',
      genre: '',
      rating: '',
      synopsis: ''
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(manga)
    })
    expect(response.ok).toBeFalse()
  })
})

describe('GET /search', function () {
  it('should return a status between 200 & 399', async function () {
    const result = await fetch(baseUrl)
    expect(result.status).toBeGreaterThanOrEqual(200)
    expect(result.status).toBeLessThanOrEqual(399)
  })
})

describe("POST '/searchTitle'", function () {
  const url = new URL('/searchTitle', baseUrl)
  it('should accept valid title', async function () {
    const search = {
      title: 'Cowboy Bebop'
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(search)
    })
    expect(response.ok).toBeTrue()
  })
})