import {z} from 'zod';

export const signupSchema = z.object({
    walletAddress: z.string().startsWith('0x', {message: 'Wallet address must start with 0x'}),
    name: z.string().min(1, {message: 'Name is required'}),
    email: z.string().email({message: 'Invalid email format'}),
    phone: z.string().regex(/^\+[0-9]{1,15}$/, {message: 'Phone must start with + followed by numbers'}),
    uid: z.string().min(1, {message: 'UID is required'}),
    dob: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, {message: 'Date must be in format DD/MM/YYYY'}),
    role: z.number().int().positive(),
    photo: z.instanceof(File, {message: 'Photo must be a file'}).nullable(),
    idDocument: z.instanceof(File, {message: 'ID Document must be a file'}).nullable(),
});


export interface SignupFormData {
    walletAddress: string;
    name: string;
    email: string;
    phone: string;
    uid: string;
    dob: string;
    role: number;
    photo: File | null;
    idDocument: File | null;
}