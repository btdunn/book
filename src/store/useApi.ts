import { APIEndpoint, Book, User } from "types/api"

import { defineStore } from "pinia"

const api = 'http://localhost:9000'

const apiDefinition: Readonly<Record<string, APIEndpoint>> = {
  getBooks: {
    url: '/books',
    method: 'GET',
  },
  createUser: {
    url: '/users/new',
    method: 'POST',      
  },
  createFavorite: {
    url: '/users/',
    method: 'POST',
  },
  getFavorite: {
    url: '/users/',
    method: 'GET',
  },
  login: {
    url: '/login',
    method: 'POST',
  }
}

export const useApi = defineStore('api', {
  state: () => 
    ({
      books: [] as Book[],
      user: '',
      userFav: ''
    }),
  actions: {
    poll() {
      const { pause, resume } = useIntervalFn(() => {
        this.getBooks().then((result) => this.books = result)
      }, 1000)
      resume()
    },
    async getBooks() {
      const response = await fetch(api + apiDefinition.getBooks.url)
      const books = await response.json()
      if (books) {
        return books.data.books
      } else {
        return { message: 'error' }
      }
    },
    async createUser(user: User) {
      const newUser = { username: user.username, password: user.password }
      const response = await fetch(api + apiDefinition.createUser.url, {
        method: apiDefinition.createUser.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
      const result = await response.json()
      this.user = newUser.username

      if (result) {
        return result
      } else {
        return { message: 'error' }
      }
    },
    async createFavorite(user: string, bookId: string) {
      const response = await fetch(api + apiDefinition.createFavorite.url + `/${user}` + '/favorites', {
        method: apiDefinition.createFavorite.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          book: bookId,
        }),
      })
      const result = await response.json()

      if (result) {
        return result
      } else {
        return { message: 'error' }
      }
    },
    async getFavorite(user: string) {
      const response = await fetch(api + apiDefinition.getFavorite.url + `/${user}` + '/favorites')
      const result = await response.json()
      if (result) {
        return result.data.favorites
      } else {
        return { message: 'error' }
      }
    },
    async login(user: User) {
      const login = { username: user.username, password: user.password, favorite: user.favorite }
      const response = await fetch(api + apiDefinition.login.url, {
        method: apiDefinition.login.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(login),
      })
      const result = await response.json()
      this.user = login.username
      this.userFav = login.favorite ? login.favorite : ''

      if (result) {
        return result
      } else {
        return { message: 'error' }
      }
    },
  }
})

