import React from 'react';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Link, LoaderCircle, UserRoundPlus} from "lucide-react";

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

// Modified schema to use Date for dob
const signupFormSchema = z.object({
    walletAddress: z.string().startsWith('0x', {message: 'Wallet address must start with 0x'}),
    name: z.string().min(1, {message: 'Name is required'}),
    email: z.string().email({message: 'Invalid email format'}),
    phone: z.string().regex(/^\+[0-9]{1,15}$/, {message: 'Phone must start with + followed by numbers'}),
    uid: z.string().min(1, {message: 'UID is required'}),
    // dob: z.date({
    //     required_error: "Date of birth is required",
    // }),
    dob: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, {message: 'Date must be in format DD/MM/YYYY'}),
    role: z.coerce.number().int().positive(),
    photo: z.instanceof(File, {message: 'Photo must be a file'}).nullable().optional(),
    idDocument: z.instanceof(File, {message: 'ID Document must be a file'}).nullable().optional(),
});

type SignupFormValues = z.infer<typeof signupFormSchema>;

interface SignupFormProps {
    connectMetaMask: () => Promise<string>;
    onSubmit: (data: FormData) => Promise<void>;
    isSubmitting: boolean;
}

export function SignupForm({connectMetaMask, onSubmit, isSubmitting}: SignupFormProps) {
    // Initialize the form
    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            walletAddress: '',
            name: '',
            email: '',
            phone: '',
            uid: '',
            role: 1,
            photo: null,
            idDocument: null,
        },
    });

    // Handle file input changes separately
    const fileRefs = {
        photo: React.useRef<HTMLInputElement>(null),
        idDocument: React.useRef<HTMLInputElement>(null),
    };

    // Connect MetaMask and update form value
    const handleConnectMetaMask = async () => {
        try {
            const address = await connectMetaMask();
            form.setValue('walletAddress', address);
        } catch (error) {
            console.error('MetaMask connection failed:', error);
        }
    };

    // Form submission handler
    const handleSubmitForm = async (values: SignupFormValues) => {
        const formData = new FormData();

        // Add all text values
        Object.entries(values).forEach(([key, value]) => {
            if (value !== null && key !== 'photo' && key !== 'idDocument') {
                // Convert date to DD/MM/YYYY format
                if (key === 'dob' && value instanceof Date) {
                    const day = String(value.getDate()).padStart(2, '0');
                    const month = String(value.getMonth() + 1).padStart(2, '0');
                    const year = value.getFullYear();
                    formData.append(key, `${day}/${month}/${year}`);
                } else {
                    formData.append(key, value.toString());
                }
            }
        });

        // Add files from refs
        if (fileRefs.photo.current?.files?.[0]) {
            formData.append('photo', fileRefs.photo.current.files[0]);
        }

        if (fileRefs.idDocument.current?.files?.[0]) {
            formData.append('idDocument', fileRefs.idDocument.current.files[0]);
        }

        await onSubmit(formData);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitForm)} className="grid grid-cols-2 gap-6" noValidate>
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="walletAddress"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Wallet Address</FormLabel>
                            <div className="flex">
                                <FormControl>
                                    <Input {...field} placeholder="0x..."/>
                                </FormControl>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    className="ml-2 text-white bg-[#D0E6FD] text-[#162660]"
                                    onClick={handleConnectMetaMask}
                                >
                                    <Link/>
                                    Link
                                </Button>
                            </div>
                            <FormMessage/>
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="+1234567890"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="uid"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>UID</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                {/*<FormField*/}
                {/*    control={form.control}*/}
                {/*    name="dob"*/}
                {/*    render={({field}) => (*/}
                {/*        <FormItem className="flex flex-col">*/}
                {/*            <FormLabel>Date of Birth</FormLabel>*/}
                {/*            <Popover>*/}
                {/*                <PopoverTrigger asChild>*/}
                {/*                    <FormControl>*/}
                {/*                        <Button*/}
                {/*                            variant="outline"*/}
                {/*                            className={cn(*/}
                {/*                                "w-full pl-3 text-left font-normal",*/}
                {/*                                !field.value && "text-muted-foreground"*/}
                {/*                            )}*/}
                {/*                        >*/}
                {/*                            {field.value ? (*/}
                {/*                                format(field.value, "PPP")*/}
                {/*                            ) : (*/}
                {/*                                <span>Pick a date</span>*/}
                {/*                            )}*/}
                {/*                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>*/}
                {/*                        </Button>*/}
                {/*                    </FormControl>*/}
                {/*                </PopoverTrigger>*/}
                {/*                <PopoverContent className="w-auto p-0" align="start">*/}
                {/*                    <Calendar*/}
                {/*                        mode="single"*/}
                {/*                        selected={field.value}*/}
                {/*                        onSelect={field.onChange}*/}
                {/*                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}*/}
                {/*                        initialFocus*/}
                {/*                    />*/}
                {/*                </PopoverContent>*/}
                {/*            </Popover>*/}
                {/*            <FormMessage/>*/}
                {/*        </FormItem>*/}
                {/*    )}*/}
                {/*/>*/}

                {/*<FormField*/}
                {/*    control={form.control}*/}
                {/*    name="role"*/}
                {/*    render={({field}) => (*/}
                {/*        <FormItem>*/}
                {/*            <FormLabel>Role</FormLabel>*/}
                {/*            <Select*/}
                {/*                onValueChange={(value) => field.onChange(parseInt(value))}*/}
                {/*                defaultValue={field.value?.toString()}*/}
                {/*            >*/}
                {/*                <FormControl>*/}
                {/*                    <SelectTrigger>*/}
                {/*                        <SelectValue placeholder="Select a role"/>*/}
                {/*                    </SelectTrigger>*/}
                {/*                </FormControl>*/}
                {/*                <SelectContent>*/}
                {/*                    <SelectItem value="1">Role 1</SelectItem>*/}
                {/*                    <SelectItem value="2">Role 2</SelectItem>*/}
                {/*                    <SelectItem value="3">Role 3</SelectItem>*/}
                {/*                </SelectContent>*/}
                {/*            </Select>*/}
                {/*            <FormMessage/>*/}
                {/*        </FormItem>*/}
                {/*    )}*/}
                {/*/>*/}

                <FormField
                    control={form.control}
                    name="dob"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Date of Birth (DD/MM/YYYY)</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="DD/MM/YYYY"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormItem>
                    <FormLabel>Photo</FormLabel>
                    <FormControl>
                        <Input
                            type="file"
                            accept=".jpg, .jpeg"
                            ref={fileRefs.photo}
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    form.setValue('photo', e.target.files[0]);
                                }
                            }}
                        />
                    </FormControl>
                    <FormMessage>{form.formState.errors.photo?.message}</FormMessage>
                </FormItem>

                <FormItem>
                    <FormLabel>ID Document (PDF)</FormLabel>
                    <FormControl>
                        <Input
                            type="file"
                            accept=".pdf"
                            ref={fileRefs.idDocument}
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    form.setValue('idDocument', e.target.files[0]);
                                }
                            }}
                        />
                    </FormControl>
                    <FormMessage>{form.formState.errors.idDocument?.message}</FormMessage>
                </FormItem>

                <Button
                    type="submit"
                    className="w-full col-span-2 bg-[#162660]"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <LoaderCircle className="animate-spin"/> : <UserRoundPlus/>}
                    {isSubmitting ? 'Submitting...' : 'Sign Up'}
                </Button>
            </form>
        </Form>
    );
}