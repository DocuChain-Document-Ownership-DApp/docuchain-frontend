// documentTransferApi.ts
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from "@/store/store.ts";

export interface DocumentTransferParams {
    docId: string;
    newOwner: string;
}

export const documentTransferApi = createApi({
    reducerPath: 'documentTransferApi',
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
        transferDocument: builder.mutation<void, DocumentTransferParams>({
            query: (params) => ({
                url: 'documents/transfer',
                method: 'POST',
                body: params,
            }),
        }),
    }),
});

export const {useTransferDocumentMutation} = documentTransferApi;