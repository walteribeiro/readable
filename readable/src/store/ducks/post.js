import * as api from '../../utils/ReadableAPI'

// Action Types
export const Types = {
  GET_ALL_POSTS: 'post/GET_ALL_POSTS',
  GET_ALL_POSTS_BY_CATEGORY: 'post/GET_ALL_POSTS_BY_CATEGORY',
  GET_POST_BY_ID: 'post/GET_POST_BY_ID',
  GET_COMMENTS_OF_POST: 'post/GET_COMMENTS_OF_POST',
  ADD_POST: 'post/ADD_POST',
  EDIT_POST: 'post/EDIT_POST',
  VOTE_UP: 'post/VOTE_UP',
  VOTE_DOWN: 'post/VOTE_DOWN',
  ADD_COMMENT: 'post/ADD_COMMENT',
  EDIT_COMMENT: 'post/EDIT_COMMENT',
  VOTE_UP_COMMENT: 'post/VOTE_UP_COMMENT',
  VOTE_DOWN_COMMENT: 'post/VOTE_DOWN_COMMENT',
  REMOVE_POST: 'post/REMOVE_POST',
  REMOVE_COMMENT: 'post/REMOVE_COMMENT'
}

// Reducer
const initialState = {
  data: [],
  selectedPost: null,
  comments: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_ALL_POSTS:
      return { ...state, data: action.payload }

    case Types.GET_ALL_POSTS_BY_CATEGORY:
      return { ...state, data: action.payload }

    case Types.ADD_POST:
      return {
        ...state,
        data: state.data.concat(action.payload)
      }

    case Types.EDIT_POST:
      return { ...state, selectedPost: action.payload }

    case Types.GET_POST_BY_ID:
      return { ...state, selectedPost: action.payload }

    case Types.GET_COMMENTS_OF_POST:
      return { ...state, comments: action.payload }

    case Types.VOTE_UP:
    case Types.VOTE_DOWN:
      const posts = state.data.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload }
        }
        return item
      })
      return {
        ...state,
        data: posts,
        selectedPost: action.payload
      }

    case Types.VOTE_UP_COMMENT:
    case Types.VOTE_DOWN_COMMENT:
      return {
        ...state,
        comments: state.comments.map(item => {
          if (item.id === action.payload.id) {
            return { ...item, ...action.payload }
          }
          return item
        })
      }

    case Types.ADD_COMMENT:
      return {
        ...state,
        selectedPost: { ...state.selectedPost, commentCount: state.selectedPost.commentCount + 1},
        comments: state.comments.concat(action.payload)
      }

    case Types.EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map(item => {
          if (item.id === action.payload.id) {
            return { ...item, ...action.payload }
          }
          return item
        })
      }

    case Types.REMOVE_POST:
      return {
        ...state,
        data: state.data.filter(item => item.id !== action.payload.id)
      }

    case Types.REMOVE_COMMENT:
      return {
        ...state,
        selectedPost: { ...state.selectedPost, commentCount: state.selectedPost.commentCount - 1},
        comments: state.comments.filter(item => item.id !== action.payload.id)
      }

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

export const getPostById = post => ({
  type: Types.GET_POST_BY_ID,
  payload: post
})

export const getCommentsOfPost = comments => ({
  type: Types.GET_COMMENTS_OF_POST,
  payload: comments
})

export const addPost = post => ({
  type: Types.ADD_POST,
  payload: post
})

export const editPost = post => ({
  type: Types.EDIT_POST,
  payload: post
})

export const removePost = post => ({
  type: Types.REMOVE_POST,
  payload: post
})

export const voteUp = post => ({
  type: Types.VOTE_UP,
  payload: post
})

export const voteDown = post => ({
  type: Types.VOTE_DOWN,
  payload: post
})

export const voteUpComment = comment => ({
  type: Types.VOTE_UP_COMMENT,
  payload: comment
})

export const voteDownComment = comment => ({
  type: Types.VOTE_DOWN_COMMENT,
  payload: comment
})

export const addComment = comment => ({
  type: Types.ADD_COMMENT,
  payload: comment
})

export const editComment = comment => ({
  type: Types.EDIT_COMMENT,
  payload: comment
})

export const removeComment = comment => ({
  type: Types.REMOVE_COMMENT,
  payload: comment
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

export const requestPostsById = postId => (dispatch, getState) => {
  api.getPost(postId).then(response => {
    if (response.id === postId) {
      dispatch(getPostById(response))
    } else {
      window.location.replace('http://localhost:3000/error')
    }
  })
}

export const requestCommentsOfPost = postId => (dispatch, getState) => {
  api.getCommentsOfPost(postId).then(response => {
    dispatch(getCommentsOfPost(response))
  })
}

export const requestNewPost = post => (dispatch, getState) => {
  api.createPost(post).then(response => {
    dispatch(addPost(response))
  })
}

export const requestNewComment = comment => (dispatch, getState) => {
  api.createComment(comment).then(response => {
    dispatch(addComment(response))
  })
}

export const requestEditPost = post => (dispatch, getState) => {
  api.updatePost(post.id, post).then(response => {
    dispatch(editPost(response))
  })
}

export const requestDeletePost = id => (dispatch, getState) => {
  api.removePost(id).then(response => {
    dispatch(removePost(response))
  })
}

export const requestEditComment = comment => (dispatch, getState) => {
  api.updateComment(comment.id, comment).then(response => {
    dispatch(editComment(response))
  })
}

export const requestDeleteComment = id => (dispatch, getState) => {
  api.removeComment(id).then(response => {
    dispatch(removeComment(response))
  })
}

export const votePost = (postId, value) => (dispatch, getState) => {
  api.votePost(postId, value).then(response => {
    if (value === 'upVote') {
      dispatch(voteUp(response))
    } else {
      dispatch(voteDown(response))
    }
  })
}

export const voteComment = (commentId, value) => (dispatch, getState) => {
  api.voteComment(commentId, value).then(response => {
    if (value === 'upVote') {
      dispatch(voteUpComment(response))
    } else {
      dispatch(voteDownComment(response))
    }
  })
}
