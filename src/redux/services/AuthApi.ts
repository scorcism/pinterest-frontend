import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loginType, registerType } from "../../types/auth.type";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth`,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<loginType, any>({
      query: (cred: loginType) => ({
        url: "/login",
        method: "post",
        body: cred,
      }),
    }),
    registerUser: builder.mutation<registerType, any>({
      query: (cred: registerType) => ({
        url: "/register",
        method: "post",
        body: cred,
      }),
    }),
    forgotPassword: builder.mutation<String, any>({
      query: (cred: any) => ({
        url: "/forgot-password",
        method: "post",
        body: cred,
      }),
    }),
    verifyAccount: builder.mutation<String, any>({
      query: ({ id }: any) => ({
        url: `/verify-account/${id}`,
        method: "post",
      }),
    }),
    resendVerifyAccountMail: builder.mutation<String, any>({
      query: (cred: any) => ({
        url: `/resend-verify-account/`,
        method: "post",
        body: cred,
      }),
    }),
    resetPassword: builder.mutation({
      query: (cred: any) => ({
        url: `/reset-password/${cred.id}/${cred.token}`,
        method: "post",
        body: cred.body,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useVerifyAccountMutation,
  useResendVerifyAccountMailMutation,
  useResetPasswordMutation
} = authApi;
