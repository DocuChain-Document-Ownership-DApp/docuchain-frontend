import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const signInAuthApi = createApi({
    reducerPath: 'signInAuthApi',
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3000"}),
    endpoints: (builder) => ({
        generateNonce: builder.mutation({
            query: (walletAddress) => ({
                url: '/auth/generate-nonce',
                method: 'POST',
                body: {walletAddress},
            }),
        }),
        verifySignature: builder.mutation({
            query: ({walletAddress, signature, nonce}) => ({
                url: '/auth/verify-signature',
                method: 'POST',
                body: {walletAddress, signature, nonce},
            }),
        }),
    }),
});

export const {useGenerateNonceMutation, useVerifySignatureMutation} = signInAuthApi;
