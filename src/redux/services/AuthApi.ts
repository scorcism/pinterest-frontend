import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  errorType,
  forgotPasswordType,
  googleAuthType,
  loginType,
  registerType,
  resendVerifyAccountMailType,
  resetPasswordType,
  successType,
} from "../../types/auth.type";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth`,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<successType | errorType, loginType>({
      query: (cred: loginType) => ({
        url: "/login",
        method: "post",
        body: cred,
      }),
    }),
    registerUser: builder.mutation<successType | errorType, registerType>({
      query: (cred: registerType) => ({
        url: "/register",
        method: "post",
        body: cred,
      }),
    }),
    forgotPassword: builder.mutation<
      successType | errorType,
      forgotPasswordType
    >({
      query: (cred) => ({
        url: "/forgot-password",
        method: "post",
        body: cred,
      }),
    }),
    verifyAccount: builder.mutation<successType | errorType, any>({
      query: ({ id }: { id: number | string }) => ({
        url: `/verify-account/${id}`,
        method: "post",
      }),
    }),
    resendVerifyAccountMail: builder.mutation<
      successType | errorType,
      resendVerifyAccountMailType
    >({
      query: (cred) => ({
        url: `/resend-verification-mail/`,
        method: "post",
        body: cred,
      }),
    }),
    resetPassword: builder.mutation<successType | errorType, resetPasswordType>(
      {
        query: (cred) => ({
          url: `/reset-password/${cred.id}/${cred.token}`,
          method: "post",
          body: cred.body,
        }),
      },
    ),
    googleAuth: builder.mutation<successType | errorType, googleAuthType>({
      query: (cred) => ({
        url: `/google/`,
        method: "post",
        body: cred,
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
  useResetPasswordMutation,
  useGoogleAuthMutation,
} = authApi;
