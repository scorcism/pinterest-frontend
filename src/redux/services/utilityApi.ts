import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const utilityApi = createApi({
  reducerPath: "utilityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_BASE_URL}/`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Authorization", `Bearer ${Cookies.get("AUTH_TOKEN")}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    updateUserMeta: builder.mutation({
      query: (cred: any) => ({
        url: `/user-meta/update-meta`,
        method: "post",
        body: cred,
      }),
    }),
    getUserMetaData: builder.query({
      query: () => "/user-meta/user-meta-data",
    }),
    getUserMetaDataUsingUserName: builder.query({
      query: (cred: any) =>
        `/user-meta/userDataByUsername?username=${cred.username}`,
    }),
    getAllPosts: builder.query({
      query: (cred: any) => `/posts/getPosts?page=${cred.page}`,
    }),
    addBookmark: builder.mutation({
      query: (cred: any) => ({
        url: `/bookmark/addBookmark`,
        method: "post",
        body: cred,
      }),
    }),
    getBookmarks: builder.query({
      query: (cred: any) => `/bookmark/getBookmarks?username=${cred.username}`,
    }),
    getUserPosts: builder.query({
      query: (cred: any) => `/posts/getUserPosts?username=${cred.username}`,
    }),
    getPost: builder.query({
      query: (cred: any) => `/posts/getPost/${cred.id}`,
    }),
    checkUsername: builder.query({
      query: (cred: any) =>
        `/user-meta/checkUsername?username=${cred.username}`,
    }),
    updateUserName: builder.mutation({
      query: (cred: any) => ({
        url: `/user-meta/updateUsername`,
        method: "post",
        body: cred,
      }),
    }),
  }),
});

export const {
  useLazyGetUserMetaDataQuery,
  useUpdateUserMetaMutation,
  useLazyGetUserMetaDataUsingUserNameQuery,
  useLazyGetAllPostsQuery,
  useAddBookmarkMutation,
  useLazyGetBookmarksQuery,
  useLazyGetUserPostsQuery,
  useGetPostQuery,
  useLazyCheckUsernameQuery,
  useUpdateUserNameMutation
} = utilityApi;
