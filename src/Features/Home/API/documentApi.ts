import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from "@/store/store.ts";

interface DocumentClass {
    name: string;
    code: string;
}

interface Department {
    name: string;
    documents: DocumentClass[];
}

interface State {
    name: string;
    departments: Department[];
}

interface Authority {
    name: string;
    departments?: Department[];
    states?: State[];
}

interface Sector {
    _id: string;
    class: string;
    authorities: Authority[];
}

interface DocumentClassesResponse {
    success: boolean;
    sectors: {
        [key: string]: Sector;
    };
    totalSectors: number;
    processingTime: string;
}

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
        getDocumentClasses: builder.query<DocumentClassesResponse, void>({
            query: () => 'documents/document-classes',
        }),
    }),
});

export const {useIssueDocumentMutation, useGetDocumentClassesQuery} = documentApi;
