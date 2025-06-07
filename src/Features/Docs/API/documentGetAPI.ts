import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from "@/store/store.ts";

export interface DocumentSearchResponse {
    documents: {
        docId: string;
        issuer: string;
        recipient: string;
        createdAt: string;
        updatedAt: string;
    }[];
    totalCount: number;
    processingTime: number;
    searchCriteria: {
        issuer?: string;
        recipient?: string;
    };
}

export interface DocumentSearchParams {
    issuer?: string;
    recipient?: string;
    page?: number;
    limit?: number;
}

export interface DocumentGetParams {
    docId: string;
}

export const documentGetApi = createApi({
    reducerPath: 'documentGetApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api",
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.accessToken;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        searchDocuments: builder.query<DocumentSearchResponse, DocumentSearchParams>({
            query: (params) => ({
                url: 'documents/search',
                method: 'POST', // Changed to POST to allow request body
                body: params,
            }),
        }),
        getDocument: builder.mutation<Blob, DocumentGetParams>({
            query: (params) => ({
                url: 'documents/get',
                method: 'POST',
                body: params,
                responseHandler: (response) => response.blob(),
            }),
        }),
    }),
});

export const {useSearchDocumentsQuery, useGetDocumentMutation} = documentGetApi;