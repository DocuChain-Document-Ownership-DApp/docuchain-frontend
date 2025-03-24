import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from "@/store/store.ts";

export const documentApi = createApi({
    reducerPath: 'documentApi',
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
        issueDocument: builder.mutation({
            query: (formData) => ({
                url: 'documents/issue',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

export const {useIssueDocumentMutation} = documentApi;
