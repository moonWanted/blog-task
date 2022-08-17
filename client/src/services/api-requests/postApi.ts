import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { Post } from '../../store/types/post'

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/`,
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    getPosts: build.query<Post[], string>({
      query: () => ({ url: `post` }),
      transformResponse: (response:  Post[] , meta, arg) => response,
      providesTags: (result, error, id) => result
        ? [
          ...result.map(({ id }) => ({ type: 'Post' as const, id })),
          { type: 'Post', id: 'LIST' },
        ]
        : [{ type: 'Post', id: 'LIST' }],
    }),
    createPost: build.mutation<Post, Partial<Post>>({
      invalidatesTags: (result, error, id) => [{ type: 'Post', id: 'LIST' }],
      query: (body) => ({ url: `post`, method: 'POST', body }),
    }),
    deletePost: build.mutation<{ message: string }, string>({
      query(id) {
        return {
          url: `post/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
  }),
})

export const {
  reducerPath,
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  reducer: postReducer,
  middleware: postMiddleware,
} = postApi
