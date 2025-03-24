import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

interface SignupResponse {
    success: boolean;
    walletAddress: string;
    processingTime: number;
}

export const signUpAuthApi = createApi({
    reducerPath: 'signUpAuthApi',
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3000"}),
    tagTypes: ['Auth'], // Define tag types
    endpoints: (builder) => ({
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

export const {useSignupMutation} = signUpAuthApi;