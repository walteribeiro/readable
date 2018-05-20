import * as api from '../../utils/ReadableAPI'

// Action types
export const Types = {
  GET_ALL_CATEGORIES: 'category/GET_ALL_CATEGORIES'
}

// Reducers
const initialState = {
  list: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_ALL_CATEGORIES:
      return { ...state, list: action.payload.categories }

    default:
      return state
  }
}

// Action creators
export const getAllCategories = categories => ({
  type: Types.GET_ALL_CATEGORIES,
  payload: categories
})

export const requestCategories = () => (dispatch, getState) => {
  api.getAllCategories().then(response => {
    dispatch(getAllCategories(response))
  })
}
