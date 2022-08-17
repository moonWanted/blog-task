import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CommentState, Comment } from '../types/comment'

const initialState: CommentState = {
  list: [],
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setCommentsList: (state, action: PayloadAction<Comment[]>) => {
      state.list = action.payload
    }
  }
})

export const {
  setCommentsList,
} = commentSlice.actions

export default commentSlice.reducer