import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import {
  UserMetaType,
  addBookmarkType,
  pageType,
  usernameType,
} from "../../types/utility.type";

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
      query: (cred: UserMetaType) => ({
        url: `/user-meta/update-meta`,
        method: "post",
        body: cred,
      }),
    }),
    getUserMetaData: builder.query({
      query: () => "/user-meta/user-meta-data",
    }),
    getUserMetaDataUsingUserName: builder.query({
      query: (cred: usernameType) =>
        `/user-meta/userDataByUsername?username=${cred.username}`,
    }),
    getAllPosts: builder.query({
      query: (cred: pageType) => `/posts/getPosts?page=${cred.page}`,
    }),
    addBookmark: builder.mutation({
      query: (cred: addBookmarkType) => ({
        url: `/bookmark/addBookmark`,
        method: "post",
        body: cred,
      }),
    }),
    getBookmarks: builder.query({
      query: (cred: usernameType) =>
        `/bookmark/getBookmarks?username=${cred.username}`,
    }),
    getUserPosts: builder.query({
      query: (cred: usernameType) =>
        `/posts/getUserPosts?username=${cred.username}`,
    }),
    getPost: builder.query({
      query: (cred: { id: number | string }) => `/posts/getPost/${cred.id}`,
    }),
    checkUsername: builder.query({
      query: (cred: usernameType) =>
        `/user-meta/checkUsername?username=${cred.username}`,
    }),
    updateUserName: builder.mutation({
      query: (cred: usernameType) => ({
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
  useUpdateUserNameMutation,
} = utilityApi;
