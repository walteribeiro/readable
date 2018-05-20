import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import category from './ducks/category'
import post from './ducks/post'

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const reducers = combineReducers({ category, post })
const store = applyMiddleware(thunk)(createStore)(reducers, devTools)

export default store
