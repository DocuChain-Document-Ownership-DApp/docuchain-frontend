import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

interface SignupResponse {
    success: boolean;
    walletAddress: string;
    processingTime: number;
}

interface VerifyEmailResponse {
    messageId: string;
    sent: boolean;
}

export const signUpAuthApi = createApi({
    reducerPath: 'signUpAuthApi',
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3000"}),
    tagTypes: ['Auth'], // Define tag types
    endpoints: (builder) => ({
        verifyEmail: builder.mutation<VerifyEmailResponse, { email: string }>({
            query: (body) => ({
                url: '/auth/verify-email',
                method: 'POST',
                body,
            }),
        }),
        signup: builder.mutation<SignupResponse, FormData>({
            query: (formData) => ({
                url: '/auth/signup',
                method: 'POST',
                body: formData,
            }),
            // Optional: Invalidate tags if needed
            invalidatesTags: ['Auth'],
        }),
    }),
});

export const {useSignupMutation, useVerifyEmailMutation} = signUpAuthApi;