import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from "@/store/store";

interface VerifyResponse {
    message: string;
}

interface VerifyOTPResponse {
    isVerified: boolean;
    document: {
        docId: string;
        doc_code: string;
        issuer: string;
        recipient: string;
        fileName: string;
        fileType: string;
        fileSize: number;
    };
    owner: {
        walletAddress: string;
        name: string;
        uid: string;
        dob: string;
        photo: {
            data: string;
            type: string;
        };
    };
}

export const verifyApi = createApi({
    reducerPath: 'verifyApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.accessToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        verifyDocument: builder.query<VerifyResponse, string>({
            query: (docId) => `/documents/verify?docId=${docId}`,
        }),
        verifyOTP: builder.mutation<VerifyOTPResponse, { docId: string; otp: string }>({
            query: (body) => ({
                url: '/documents/verify',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useVerifyDocumentQuery, useVerifyOTPMutation } = verifyApi; 