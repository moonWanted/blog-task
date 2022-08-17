import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CommentState, Comment } from '../types/comment'

const initialState: CommentState = {
  list: [],
  loading: false,
  error: null,
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    fetchCommentsById: (state) => {
      state.loading = true
    },
    fetchCommentsByIdFailure: (state, action: PayloadAction<{ error: string }>) => {
      state.loading = false
      state.error = action.payload.error
    },
    fetchCommentsByIdSuccess: (state, action: PayloadAction<Comment[]>) => {
      const roots = [];
      const byId = new Map();
      const replies = action.payload

      for(const reply of replies)
        byId.set(reply.id, reply);

      for(const reply of replies) {
        const {responseId} = reply;
        if(responseId) {
          const parent = byId.get(responseId);
          (parent.responses || (parent.responses = [])).push(reply);
        } else {
          roots.push(reply);
        }
      }
      state.list = roots
    }
  }
})

export const {
  fetchCommentsById,
  fetchCommentsByIdFailure,
  fetchCommentsByIdSuccess,
} = commentSlice.actions

export default commentSlice.reducer