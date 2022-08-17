import { combineReducers, configureStore } from '@reduxjs/toolkit'

import postReducer from './slices/post'
import commentReducer from './slices/comment'

const rootReducer = combineReducers({
  post: postReducer,
  comment: commentReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch