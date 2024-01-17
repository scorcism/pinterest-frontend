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
  }),
});

export const { useLazyGetUserMetaDataQuery, useUpdateUserMetaMutation } = utilityApi;
