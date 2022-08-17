import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

import { postApi } from '../services/api-requests/postApi'
import { commentApi } from '../services/api-requests/commentApi'

import postReducer from './slices/post'
import commentReducer from './slices/comment'

const rootReducer = combineReducers({
  post: postReducer,
  comment: commentReducer,
  [postApi.reducerPath]: postApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware, commentApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch