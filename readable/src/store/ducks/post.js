import * as api from '../../utils/ReadableAPI'

// Action Types
export const Types = {
  GET_ALL_POSTS: 'post/GET_ALL_POSTS',
  GET_ALL_POSTS_BY_CATEGORY: 'post/GET_ALL_POSTS_BY_CATEGORY'
}

// Reducer
const initialState = {
  list: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_ALL_POSTS:
      return { ...state, list: action.payload }

    case Types.GET_ALL_POSTS_BY_CATEGORY:
      return { ...state, list: action.payload }

    default:
      return state
  }
}

// Action creators
export const getAllPosts = posts => ({
  type: Types.GET_ALL_POSTS,
  payload: posts
})

export const getAllPostsByCategory = posts => ({
  type: Types.GET_ALL_POSTS_BY_CATEGORY,
  payload: posts
})

export const requestPosts = () => (dispatch, getState) => {
  api.getAllPosts().then(response => {
    dispatch(getAllPosts(response))
  })
}

export const requestPostsByCategory = category => (dispatch, getState) => {
  api.getAllPostsByCategory(category).then(response => {
    dispatch(getAllPostsByCategory(response))
  })
}
