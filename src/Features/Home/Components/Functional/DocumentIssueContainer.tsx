import React, {useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useSelector} from 'react-redux';
import {useIssueDocumentMutation} from "@/Features/Home/API/documentApi.ts";
import {toast} from "sonner";
import {DocumentForm} from "@/Features/Home/Components/Presentational/DocumentForm.tsx";
import {documentFormSchema} from "@/Features/Home/Schemas/DocumentFormSchema.ts";
import {DocumentFormData} from "@/Features/Home/Types/DocumentTypes.ts";
import {RootState} from "@/store/store.ts";

export const DocumentIssueContainer: React.FC = () => {
    const [issueDocument] = useIssueDocumentMutation();
    const {walletAddress} = useSelector((state: RootState) => state.auth);

    const formMethods = useForm<DocumentFormData>({
        resolver: zodResolver(documentFormSchema),
        defaultValues: {
            document: undefined,
            recipientAddress: '',
            forMe: false,
        },
    });

    const {watch, setValue, reset} = formMethods;
    const forMe = watch('forMe');

    // Create a ref for the file input
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (forMe && walletAddress) {
            setValue('recipientAddress', walletAddress);
        } else {
            setValue('recipientAddress', '');
        }
    }, [forMe, walletAddress, setValue]);

    const handleSubmit = async (data: DocumentFormData) => {
        const formData = new FormData();

        if (data.document) {
            formData.append('document', data.document);
        }
        formData.append('recipientAddress', data.recipientAddress);

        try {
            await issueDocument(formData).unwrap();
            toast.success('Document issued successfully');
            reset(); // Reset the form upon successful submission

            // Manually clear the file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to issue document');
        }
    };

    return (
        <DocumentForm
            formMethods={formMethods}
            onSubmit={handleSubmit}
            fileInputRef={fileInputRef}
        />
    );
};
