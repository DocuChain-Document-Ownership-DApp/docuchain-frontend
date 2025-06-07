import React from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Checkbox} from '@/components/ui/checkbox';
import {UseFormReturn} from 'react-hook-form';
import {DocumentFormData} from "@/Features/Home/Types/DocumentTypes.ts";
import {DocumentClassesResponse} from '@/Features/Home/API/documentApi';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface DocumentFormProps {
    formMethods: UseFormReturn<DocumentFormData>;
    onSubmit: (data: DocumentFormData) => Promise<void>;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    documentClassesData?: DocumentClassesResponse;
    selectedSector: string;
    setSelectedSector: (value: string) => void;
    selectedAuthority: string;
    setSelectedAuthority: (value: string) => void;
    selectedState: string;
    setSelectedState: (value: string) => void;
    selectedDepartment: string;
    setSelectedDepartment: (value: string) => void;
    selectedDocument: string;
    setSelectedDocument: (value: string) => void;
    getAuthorities: () => any[];
    getStates: () => any[];
    getDepartments: () => any[];
    getDocuments: () => any[];
}

export const DocumentForm: React.FC<DocumentFormProps> = ({
    formMethods,
    onSubmit,
    fileInputRef,
    documentClassesData,
    selectedSector,
    setSelectedSector,
    selectedAuthority,
    setSelectedAuthority,
    selectedState,
    setSelectedState,
    selectedDepartment,
    setSelectedDepartment,
    selectedDocument,
    setSelectedDocument,
    getAuthorities,
    getStates,
    getDepartments,
    getDocuments,
}) => {
    const {watch, formState: {errors}} = formMethods;
    const forMe = watch('forMe');

    return (
        <Form {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-6">
                {/* Document Class Selection */}
                <div className="space-y-4">
                    <FormField
                        control={formMethods.control}
                        name="document"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Document Type</FormLabel>
                                <div className="grid grid-cols-2 gap-4">
                                    <Select value={selectedSector} onValueChange={setSelectedSector}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Sector" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {documentClassesData?.sectors && Object.keys(documentClassesData.sectors).map((sector) => (
                                                <SelectItem key={sector} value={sector}>
                                                    {sector}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    {selectedSector && (
                                        <Select value={selectedAuthority} onValueChange={setSelectedAuthority}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Authority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {getAuthorities().map((authority) => (
                                                    <SelectItem key={authority.name} value={authority.name}>
                                                        {authority.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    {selectedAuthority && getStates().length > 0 && (
                                        <Select value={selectedState} onValueChange={setSelectedState}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select State" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {getStates().map((state) => (
                                                    <SelectItem key={state.name} value={state.name}>
                                                        {state.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}

                                    {selectedAuthority && (
                                        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Department" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {getDepartments().map((dept) => (
                                                    <SelectItem key={dept.name} value={dept.name}>
                                                        {dept.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                </div>

                                {selectedDepartment && (
                                    <div className="mt-4">
                                        <Select value={selectedDocument} onValueChange={setSelectedDocument}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Document Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {getDocuments().map((doc) => (
                                                    <SelectItem key={doc.code} value={doc.code}>
                                                        {doc.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        {/* File Upload */}
                        <FormField
                            control={formMethods.control}
                            name="document"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Document File</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    formMethods.setValue('document', file);
                                                }
                                            }}
                                            ref={fileInputRef}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Recipient Address */}
                        <FormField
                            control={formMethods.control}
                            name="recipientAddress"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Recipient Address</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={forMe} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* For Me Checkbox */}
                    <FormField
                        control={formMethods.control}
                        name="forMe"
                        render={({field}) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Issue to myself</FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" className="w-full bg-[#162660]">
                    Issue Document
                </Button>
            </form>
        </Form>
    );
};
