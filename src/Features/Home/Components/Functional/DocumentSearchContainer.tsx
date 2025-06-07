import React, {useState, useEffect} from 'react';
import {toast} from 'sonner';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useSearchDocumentsQuery} from "@/Features/Docs/API/documentGetAPI.ts";
import {DocumentsTable} from "@/Features/Home/Components/Presentational/DocumentTable.tsx";

// Updated search schema to match API requirements
const documentSearchSchema = z.object({
    issuer: z.string().optional(),
    recipient: z.string().optional(),
});

type DocumentSearchFormValues = z.infer<typeof documentSearchSchema>;

export const DocumentSearchContainer: React.FC = () => {
    // Form setup
    const form = useForm<DocumentSearchFormValues>({
        resolver: zodResolver(documentSearchSchema),
        defaultValues: {
            issuer: '',
            recipient: '',
        },
    });

    // State to trigger query
    const [shouldFetch, setShouldFetch] = useState(true);
    const [searchBody, setSearchBody] = useState<DocumentSearchFormValues>({});

    // Query hook
    const {
        data,
        error,
        isLoading,
        refetch
    } = useSearchDocumentsQuery(searchBody, {
        skip: !shouldFetch
    });

    // Handle form submission
    const onSubmit = (values: DocumentSearchFormValues) => {
        // Only set search body if at least one field is filled
        const searchValues = {
            ...(values.issuer && { issuer: values.issuer }),
            ...(values.recipient && { recipient: values.recipient })
        };

        if (Object.keys(searchValues).length > 0) {
            setSearchBody(searchValues);
            setShouldFetch(true);
        } else {
            // If no search criteria, fetch all documents
            setSearchBody({});
            setShouldFetch(true);
        }
    };

    // Handle initial and subsequent fetches
    useEffect(() => {
        if (shouldFetch) {
            refetch();
            setShouldFetch(false);
        }
    }, [shouldFetch, refetch]);

    // Handle errors
    useEffect(() => {
        if (error) {
            toast.error('Failed to fetch documents', {
                description: error instanceof Error ? error.message : 'Unknown error occurred',
            });
        }
    }, [error]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Document Search</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="issuer"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Issuer Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="0x..."
                                                {...field}
                                                value={field.value || ''}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="recipient"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Recipient Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="0x..."
                                                {...field}
                                                value={field.value || ''}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Search Documents
                        </Button>
                    </form>
                </Form>

                {isLoading && <p className="text-center mt-4">Loading...</p>}

                {data && data.totalCount > 0 && (
                    <div className="mt-6">
                        <p className="text-sm text-muted-foreground mb-4">
                            Total Documents: {data.totalCount} (Processing Time: {data.processingTime}ms)
                        </p>
                        <DocumentsTable documents={data.documents}/>
                    </div>
                )}

                {data && data.documents.length === 0 && (
                    <p className="text-center mt-4 text-muted-foreground">
                        No documents found
                    </p>
                )}
            </CardContent>
        </Card>
    );
};