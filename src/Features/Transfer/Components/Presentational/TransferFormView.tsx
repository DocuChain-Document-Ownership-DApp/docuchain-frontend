import {useForm} from "react-hook-form";
import * as z from "zod";
import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import {Card, CardContent} from "@/components/ui/card.tsx";

// Validation schema
const transferFormSchema = z.object({
    docId: z.string().min(1, "Document ID is required"),
    newOwner: z.string().min(1, "New owner wallet ID is required")
});

export type TransferFormValues = z.infer<typeof transferFormSchema>;

// Presentational component
const TransferFormView = ({
                              onSubmit,
                              isLoading
                          }: {
    onSubmit: (values: TransferFormValues) => void;
    isLoading: boolean;
}) => {
    const form = useForm<TransferFormValues>({
        resolver: zodResolver(transferFormSchema),
        defaultValues: {
            docId: "",
            newOwner: ""
        },
    });

    return (
        <Card>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="docId"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Document ID</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="0x81d4dde7464eca8c6550a5475817ee359ee85b1a9f6bd52206ea1f0d8607204f"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="newOwner"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>New Owner Wallet Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="0x2b50e32642c11f512588b17a5583692De1f16544"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? "Transferring..." : "Transfer Ownership"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default TransferFormView;
