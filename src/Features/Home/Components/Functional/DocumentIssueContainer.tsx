import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useSelector} from 'react-redux';
import {useIssueDocumentMutation, useGetDocumentClassesQuery} from "@/Features/Home/API/documentApi.ts";
import {toast} from "sonner";
import {DocumentForm} from "@/Features/Home/Components/Presentational/DocumentForm.tsx";
import {documentFormSchema} from "@/Features/Home/Schemas/DocumentFormSchema.ts";
import {DocumentFormData} from "@/Features/Home/Types/DocumentTypes.ts";
import {RootState} from "@/store/store.ts";

export const DocumentIssueContainer: React.FC = () => {
    const [issueDocument] = useIssueDocumentMutation();
    const {data: documentClassesData} = useGetDocumentClassesQuery();
    const {walletAddress} = useSelector((state: RootState) => state.auth);

    // State for cascading dropdowns
    const [selectedSector, setSelectedSector] = useState<string>('');
    const [selectedAuthority, setSelectedAuthority] = useState<string>('');
    const [selectedState, setSelectedState] = useState<string>('');
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');
    const [selectedDocument, setSelectedDocument] = useState<string>('');

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


    
    // Reset dependent dropdowns when parent selection changes
    useEffect(() => {
        setSelectedAuthority('');
        setSelectedState('');
        setSelectedDepartment('');
        setSelectedDocument('');
    }, [selectedSector]);

    useEffect(() => {
        setSelectedState('');
        setSelectedDepartment('');
        setSelectedDocument('');
    }, [selectedAuthority]);

    useEffect(() => {
        setSelectedDepartment('');
        setSelectedDocument('');
    }, [selectedState]);

    useEffect(() => {
        setSelectedDocument('');
    }, [selectedDepartment]);

    const handleSubmit = async (data: DocumentFormData) => {
        if (!selectedDocument) {
            toast.error('Please select a document type');
            return;
        }

        const formData = new FormData();

        if (data.document) {
            formData.append('document', data.document);
        }
        formData.append('recipientAddress', data.recipientAddress);
        formData.append('doc_code', selectedDocument);

        try {
            await issueDocument(formData).unwrap();
            toast.success('Document issued successfully');
            reset(); // Reset the form upon successful submission

            // Reset all selections
            setSelectedSector('');
            setSelectedAuthority('');
            setSelectedState('');
            setSelectedDepartment('');
            setSelectedDocument('');

            // Manually clear the file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to issue document');
        }
    };

    // Helper functions to get options for dropdowns
    const getAuthorities = () => {
        if (!documentClassesData?.sectors[selectedSector]) return [];
        return documentClassesData.sectors[selectedSector].authorities;
    };

    const getStates = () => {
        const authority = getAuthorities().find(a => a.name === selectedAuthority);
        return authority?.states || [];
    };

    const getDepartments = () => {
        const authority = getAuthorities().find(a => a.name === selectedAuthority);
        if (selectedState) {
            const state = authority?.states?.find(s => s.name === selectedState);
            return state?.departments || [];
        }
        return authority?.departments || [];
    };

    const getDocuments = () => {
        const departments = getDepartments();
        const department = departments.find(d => d.name === selectedDepartment);
        return department?.documents || [];
    };

    return (
        <DocumentForm
            formMethods={formMethods}
            onSubmit={handleSubmit}
            
            fileInputRef={fileInputRef}
            documentClassesData={documentClassesData}
            selectedSector={selectedSector}
            setSelectedSector={setSelectedSector}
            selectedAuthority={selectedAuthority}
            setSelectedAuthority={setSelectedAuthority}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            selectedDocument={selectedDocument}
            setSelectedDocument={setSelectedDocument}
            getAuthorities={getAuthorities}
            getStates={getStates}
            getDepartments={getDepartments}
            getDocuments={getDocuments}
        />
    );
};
