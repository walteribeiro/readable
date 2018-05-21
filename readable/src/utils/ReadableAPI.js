const api = 'http://localhost:3001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAllCategories = () => fetch(`${api}/categories`, {headers})
  .then(res => res.json())
  .then(data => data)

export const getAllPostsByCategory = (category) => fetch(`${api}/${category}/posts`, {headers})
  .then(res => res.json())
  .then(data => data)

export const getAllPosts = () => fetch(`${api}/posts`, {headers})
  .then(res => res.json())
  .then(data => data)

export const getPost = (id) => fetch(`${api}/posts/${id}`, {headers})
  .then(res => res.json())
  .then(data => data)

export const createPost = (body) => fetch(`${api}/posts`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
}).then(res => res.json())

export const updatePost = (id, body) => fetch(`${api}/posts/${id}`, {
  method: 'PUT',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
}).then(res => res.json())

export const votePost = (id, vote) => fetch(`${api}/posts/${id}`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ option: vote })
}).then(res => res.json())

export const removePost = (id) => fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers
  })
  .then(res => res.json())
  .then(data => data)

