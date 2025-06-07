import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {DocumentFormData} from "@/Features/Home/Types/DocumentTypes.ts";
import {RootState} from "@/store/store.ts";
import {useSelector} from "react-redux";

// Document Classes Response Types
export interface DocumentClass {
    name: string;
    code: string;
}

export interface Department {
    name: string;
    documents: DocumentClass[];
}

export interface State {
    name: string;
    departments: Department[];
}

export interface Authority {
    name: string;
    departments?: Department[];
    states?: State[];
}

export interface Sector {
    _id: string;
    class: string;
    authorities: Authority[];
}

export interface DocumentClassesResponse {
    success: boolean;
    sectors: {
        [key: string]: Sector;
    };
    totalSectors: number;
    processingTime: string;
}

// Custom hook to handle file downloads
export const useDownloadFile = () => {
    const token = useSelector((state: RootState) => state.auth.accessToken);

    const downloadFile = async (docId: string) => {
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch('http://localhost:3000/api/documents/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify({ docId })
        });

        if (!response.ok) {
            throw new Error('Download failed');
        }

        // Get content type and filename from headers
        const contentType = response.headers.get('Content-Type') || 'application/octet-stream';
        const contentDisposition = response.headers.get('Content-Disposition');
        let filename = `document-${docId}`;
        
        // Extract filename from Content-Disposition if available
        if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename="(.+)"/);
            if (filenameMatch && filenameMatch[1]) {
                filename = filenameMatch[1];
            }
        }

        // Get file extension from content type
        const extension = contentType.split('/')[1] || 'pdf';
        if (!filename.includes('.')) {
            filename = `${filename}.${extension}`;
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    return downloadFile;
};

export const documentApi = createApi({
    reducerPath: 'documentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api',
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.accessToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getDocumentClasses: builder.query<DocumentClassesResponse, void>({
            query: () => 'documents/document-classes',
        }),
        getDocuments: builder.query<Document[], void>({
            query: () => 'documents',
        }),
        issueDocument: builder.mutation<void, DocumentFormData>({
            query: (data) => ({
                url: 'documents',
                method: 'POST',
                body: data,
            }),
        }),
        downloadDocument: builder.mutation<void, string>({
            query: (docId) => ({
                url: `documents/get`,
                method: 'POST',
                body: { docId },
            }),
        }),
    }),
});

export const {
    useGetDocumentsQuery,
    useGetDocumentClassesQuery,
    useIssueDocumentMutation,
    useDownloadDocumentMutation,
} = documentApi; 