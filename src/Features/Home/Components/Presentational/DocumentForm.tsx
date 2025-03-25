import React from 'react';
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Checkbox} from '@/components/ui/checkbox';
import {UseFormReturn} from 'react-hook-form';
import {DocumentFormData} from "@/Features/Home/Types/DocumentTypes.ts";
import {SquarePlus} from "lucide-react";

interface DocumentFormProps {
    formMethods: UseFormReturn<DocumentFormData>;
    onSubmit: (data: DocumentFormData) => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export const DocumentForm: React.FC<DocumentFormProps> = ({formMethods, onSubmit, fileInputRef}) => {
    const {handleSubmit, watch, control} = formMethods;
    const forMe = watch('forMe');

    return (
        <Form {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                {/* Document Upload */}
                <FormField
                    control={control}
                    name="document"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Document</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    onChange={(e) => field.onChange(e.target.files?.[0])}
                                    ref={fileInputRef}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="recipientAddress"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Recipient Address</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={forMe}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="forMe"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>For Me</FormLabel>
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange}
                                          className="bg-transparent"/>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="bg-[#162660]">
                    <SquarePlus/>
                    Add Document
                </Button>
            </form>
        </Form>
    );
};
