import * as api from '../../utils/ReadableAPI'

// Action Types
export const Types = {
  GET_ALL_POSTS: 'post/GET_ALL_POSTS',
  GET_ALL_POSTS_BY_CATEGORY: 'post/GET_ALL_POSTS_BY_CATEGORY',
  ADD_POST: 'post/ADD_POST',
  VOTE_UP: 'post/VOTE_UP',
  VOTE_DOWN: 'post/VOTE_DOWN',
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

    case Types.ADD_POST:
      return Object.assign({}, state, {
        list: state.list.concat(action.payload)
      })

    case Types.VOTE_UP:
      return Object.assign({}, state, {
        list: state.list.map(item => {
          if(item.id === action.id){
           return { ...item, voteScore: item.voteScore + 1 }
          }
          return item
        })
      })

    case Types.VOTE_DOWN:
      const itens = state.list.map(item => {
        if(item.id === action.id){
         return { ...item, voteScore: item.voteScore - 1 }
        }
        return item
      })
      return itens

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

export const addPost = post => ({
  type: Types.ADD_POST,
  payload: post
})

export const voteUp = (postId) => ({
  type: Types.VOTE_UP,
})

export const voteDown = (postId) => ({
  type: Types.VOTE_DOWN,
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

export const requestNewPost = (post) => (dispatch, getState) => {
  api.createPost(post).then(response => {
    dispatch(addPost(response))
  })
}

export const votePost = (postId, value) => (dispatch, getState) => {
  api.votePost(postId, value).then(response => {
    if (value === 'upVote') {
      dispatch(voteUp(postId))
    } else {
      dispatch(voteDown(postId))
    }
  })
}
