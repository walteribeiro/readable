import * as api from '../../utils/ReadableAPI'

// Action types
export const Types = {
  GET_ALL_CATEGORIES: 'category/GET_ALL_CATEGORIES'
}

// Reducers
const initialState = {
  data: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_ALL_CATEGORIES:
      return { ...state, data: action.payload }

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
    dispatch(getAllCategories(response.categories))
  })
}
