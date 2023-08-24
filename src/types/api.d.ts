export declare interface APIEndpoint {
  url: '/books' | '/users/new' | '/users/' | '/login'
  method: 'GET' | 'POST'
}

export declare interface Book {
  id: string
  title: string
  author: string
  description: string
  cover_url: string
}

export declare interface User {
  username: string
  password: string
  favorite?: string
}