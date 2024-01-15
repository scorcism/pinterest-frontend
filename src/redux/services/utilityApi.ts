import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const utilityApi = createApi({
  reducerPath: "utilityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_BASE_URL}/root`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Authorization", `Bearer ${Cookies.get("AUTH_TOKEN")}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    updateSettings: builder.mutation({
      query: (cred: any) => ({
        url: `/`,
        method: "post",
        body: cred,
      }),
    }),
  }),
});

export const {} = utilityApi;
