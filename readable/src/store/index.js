import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import categories from './ducks/category'
import posts from './ducks/post'

const reducers = combineReducers({ categories, posts })
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(logger, thunk)))

export default store
