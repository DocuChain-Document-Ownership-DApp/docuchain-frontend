import React, {useEffect} from 'react';
import {toast} from 'sonner';
import {useSearchDocumentsQuery, useGetDocumentMutation} from "@/Features/Home/API/documentGetAPI.ts";
import {DocumentsTable} from "@/Features/Docs/Components/Presentational/DocumentDataTable.tsx";

export const DocumentContainer: React.FC = () => {
    // Hardcoded search criteria
    const searchBody = {
        // issuer: "0x123456789abcdef", // Example issuer address
        // recipient: "0xfedcba987654321" // Example recipient address
    };

    // Query hook
    const {data, error, isLoading} = useSearchDocumentsQuery(searchBody);

    // Document download mutation
    const [getDocument, {isLoading: isDownloading}] = useGetDocumentMutation();

    // Handle errors
    useEffect(() => {
        if (error) {
            toast.error('Failed to fetch documents', {
                description: error instanceof Error ? error.message : 'Unknown error occurred',
            });
        }
    }, [error]);

    // Document download handler function
    const handleDocumentDownload = async (docId: string) => {
        try {
            const documentBlob = await getDocument({docId}).unwrap();

            // Try to determine file type from the blob
            let fileExtension = 'bin'; // Default to binary file

            // Check Content-Type header or try to infer from blob
            const contentType = documentBlob.type;

            // Map common MIME types to file extensions
            if (contentType) {
                switch (contentType.toLowerCase()) {
                    case 'application/pdf':
                        fileExtension = 'pdf';
                        break;
                    case 'application/msword':
                    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                        fileExtension = 'docx';
                        break;
                    case 'application/vnd.ms-excel':
                    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                        fileExtension = 'xlsx';
                        break;
                    case 'application/vnd.ms-powerpoint':
                    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                        fileExtension = 'pptx';
                        break;
                    case 'image/jpeg':
                        fileExtension = 'jpg';
                        break;
                    case 'image/png':
                        fileExtension = 'png';
                        break;
                    case 'image/gif':
                        fileExtension = 'gif';
                        break;
                    case 'text/plain':
                        fileExtension = 'txt';
                        break;
                    case 'text/html':
                        fileExtension = 'html';
                        break;
                    case 'application/json':
                        fileExtension = 'json';
                        break;
                    case 'application/xml':
                    case 'text/xml':
                        fileExtension = 'xml';
                        break;
                    case 'application/zip':
                        fileExtension = 'zip';
                        break;
                    // Add more mime types as needed
                    default:
                        // For unrecognized types, try to extract extension from content-type
                    {
                        const match = contentType.match(/\/([a-zA-Z0-9]+)$/);
                        if (match && match[1]) {
                            fileExtension = match[1];
                        }
                    }
                }
            }

            // Create a download link and trigger download
            const url = window.URL.createObjectURL(documentBlob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `document-${docId.substring(0, 8)}.${fileExtension}`);
            document.body.appendChild(link);
            link.click();

            // Clean up
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast.success('Document downloaded successfully');
        } catch (err) {
            toast.error('Failed to download document', {
                description: err instanceof Error ? err.message : 'Unknown error occurred',
            });
        }
    };

    return (
        <div>
            <h2 className="font-serif scroll-m-20 text-4xl tracking-tight">Document Search Results</h2>
            {isLoading && <p className="text-center mt-4">Loading...</p>}

            {data && data.totalCount > 0 && (
                <div>
                    <p className="text-sm text-muted-foreground my-4">
                        Total Documents: {data.totalCount} (Processing Time: {data.processingTime}ms)
                    </p>
                    <DocumentsTable
                        documents={data.documents}
                        onDownload={handleDocumentDownload}
                        isDownloading={isDownloading}
                    />
                </div>
            )}

            {data && data.documents.length === 0 && (
                <p className="text-center mt-4 text-muted-foreground">
                    No documents found
                </p>
            )}
        </div>
    );
};