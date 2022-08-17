import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PostState } from '../types/post'

const initialState: PostState = {
  list: [],
  loading: false,
  error: null,
  currentPostId: null,
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setCurrentPostId: (state, action: PayloadAction<string>) => {
      state.currentPostId = action.payload
    }
  }
})

export const {
  setCurrentPostId,
} = postSlice.actions

export default postSlice.reducer