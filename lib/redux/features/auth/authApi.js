// src/redux/features/auth/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // ✅ Register
    signUp: builder.mutation({
      query: (data) => {
        const fd = new FormData();
        fd.append("full_name", data.full_name);
        fd.append("email", data.email);
        fd.append("password", data.password);
        fd.append("confirm_password", data.confirm_password);
        fd.append("privacy_and_terms_accepted", data.privacy_and_terms_accepted);
        fd.append("purpose", "signup");
        return { url: "/signup/", method: "POST", body: fd };
      },
    }),

    // ✅ Verify OTP
    verifyOtp: builder.mutation({
      query: (data) => {
        const fd = new FormData();
        fd.append("email", data.email);
        fd.append("otp", data.otp);
        fd.append("purpose", data.purpose || "signup");
        return { url: "/verify-otp/", method: "POST", body: fd };
      },
    }),

    // ✅ Login
    signIn: builder.mutation({
      query: (data) => {
        const fd = new FormData();
        fd.append("email", data.email);
        fd.append("password", data.password);
        return { url: "/signin/", method: "POST", body: fd };
      },
    }),

    // ✅ Logout
    signOut: builder.mutation({
      query: (data) => {
        const fd = new FormData();
        fd.append("refresh_token", data.refresh_token);
        return { url: "/signout/", method: "POST", body: fd };
      },
    }),

    // ✅ Forgot Password — OTP send
    sendOtp: builder.mutation({
      query: (data) => {
        const fd = new FormData();
        fd.append("email", data.email);
        fd.append("purpose", "password_reset");
        return { url: "/send-otp/", method: "POST", body: fd };
      },
    }),

    // ✅ Resend OTP
    resendOtp: builder.mutation({
      query: (data) => {
        const fd = new FormData();
        fd.append("email", data.email);
        fd.append("purpose", data.purpose || "signup");
        return { url: "/resend-otp/", method: "POST", body: fd };
      },
    }),

    // ✅ Reset Password
    resetPassword: builder.mutation({
      query: (data) => {
        const fd = new FormData();
        fd.append("email", data.email);
        fd.append("new_password", data.new_password);
        fd.append("confirm_password", data.confirm_password);
        fd.append("purpose", "password_reset");
        return { url: "/reset-password/", method: "POST", body: fd };
      },
    }),

    // ✅ Change Password (logged in user)
    changePassword: builder.mutation({
      query: (data) => {
        const fd = new FormData();
        fd.append("old_password", data.old_password);
        fd.append("new_password", data.new_password);
        fd.append("confirm_password", data.confirm_password);
        return { url: "/change-password/", method: "POST", body: fd };
      },
    }),

    // ✅ Get Profile
    getProfile: builder.query({
      query: () => "/profile-get/",
    }),

    // ✅ Update Profile
    updateProfile: builder.mutation({
      query: (data) => {
        const fd = new FormData();
        if (data.full_name) fd.append("full_name", data.full_name);
        if (data.linkedin) fd.append("linkedin", data.linkedin);
        if (data.github) fd.append("github", data.github);
        if (data.twitter) fd.append("twitter", data.twitter);
        return { url: "/profile-update/", method: "PUT", body: fd };
      },
    }),

    // ✅ Avatar Update
    updateAvatar: builder.mutation({
      query: (file) => {
        const fd = new FormData();
        fd.append("avatar", file);
        return { url: "/avatar-update/", method: "POST", body: fd };
      },
    }),

    // ✅ Refresh Token
    refreshToken: builder.mutation({
      query: (data) => {
        const fd = new FormData();
        fd.append("refresh", data.refresh);
        return { url: "/token/refresh/", method: "POST", body: fd };
      },
    }),

    // ✅ Google Auth
    googleAuth: builder.mutation({
      query: (data) => {
        const fd = new FormData();
        fd.append("id_token", data.id_token);
        if (data.access_token) {
          fd.append("access_token", data.access_token);
        }
        return { url: "/google-auth/", method: "POST", body: fd };
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useVerifyOtpMutation,
  useSignInMutation,
  useSignOutMutation,
  useSendOtpMutation,
  useResendOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateAvatarMutation,
  useRefreshTokenMutation,
  useGoogleAuthMutation,
} = authApi;