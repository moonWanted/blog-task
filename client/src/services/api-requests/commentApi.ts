import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Comment } from '../../store/types/comment'

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/`,
  }),
  tagTypes: ['Comment'],
  endpoints: (build) => ({
    getComments: build.query<Comment[], string | null>({
      // note: an optional `queryFn` may be used in place of `query`
      query: (id) => ({ url: `comment/${id}` }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response:  Comment[] , meta, arg) => {
        const roots = []
        const byId = new Map()
        const replies = response

        for(const reply of replies)
          byId.set(reply.id, reply)

        for(const reply of replies) {
          const {responseId} = reply
          if(responseId) {
            const parent = byId.get(responseId);
            (parent.responses || (parent.responses = [])).push(reply)
          } else {
            roots.push(reply)
          }
        }
        return roots
      },
      providesTags: (result, error, id) => result
        ? [
          ...result.map(({ id }) => ({ type: 'Comment' as const, id })),
          { type: 'Comment', id: 'LIST' },
        ]
        : [{ type: 'Comment', id: 'LIST' }],
    }),
    createComment: build.mutation<Comment, Omit<Comment, 'responses' | 'id'> >({
      invalidatesTags: (result, error, id) => [{ type: 'Comment', id: 'LIST' }],
      query: (comment) => ({ url: `comment`, method: 'POST', body: comment }),
    }),
    deleteComment: build.mutation<{ message: string }, string>({
      query(id) {
        return {
          url: `comment/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'Comment', id }],
    }),
  }),
})

export const {
  reducerPath,
  useCreateCommentMutation,
  useGetCommentsQuery,
  useDeleteCommentMutation,
  reducer: commentReducer,
  middleware: commentMiddleware,
} = commentApi
