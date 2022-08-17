import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PostState, Post } from '../types/post'

const initialState: PostState = {
  list: [],
  loading: false,
  error: null,
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    fetchPosts: (state) => {
      state.loading = true
    },
    fetchPostsFailure: (state, action: PayloadAction<{ error: string }>) => {
      state.loading = false
      state.error = action.payload.error
    },
    fetchPostsSuccess: (state, action: PayloadAction<Post[]>) => {
      state.list = action.payload
    }
  }
})

export const {
  fetchPosts,
  fetchPostsFailure,
  fetchPostsSuccess,
} = postSlice.actions

export default postSlice.reducer