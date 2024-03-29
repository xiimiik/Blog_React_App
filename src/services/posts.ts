import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICommentData } from '../types/Comment';
import type { IPost, IPostWithComments } from '../types/Post';

export const postAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog-api-t6u0.onrender.com' }),
  tagTypes: ['Posts', 'Comments'],
  endpoints: (builder) => ({
    fetchAllPosts: builder.query<IPost[], number>({
      query: () => '/posts',
    }),
    fetchPostById: builder.query<IPostWithComments, number>({
      query: (id) => ({
        url: `posts/${id}`,
        params: {
          _embed: 'comments',
        },
      }),
      providesTags: ['Comments'],
    }),
    createPost: builder.mutation<void, Pick<IPost, 'body' | 'title'>>({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Posts'],
    }),
    updatePostById: builder.mutation<void, { id: number; body: Pick<IPost, 'body' | 'title'> }>({
      query: ({ id, body }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Posts'],
    }),
    deletePostById: builder.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),
    createComment: builder.mutation<void, ICommentData>({
      query: (body) => ({
        url: '/comments',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const {
  useFetchAllPostsQuery,
  useFetchPostByIdQuery,
  useUpdatePostByIdMutation,
  useCreateCommentMutation,
  useDeletePostByIdMutation,
  useCreatePostMutation,
} = postAPI;
