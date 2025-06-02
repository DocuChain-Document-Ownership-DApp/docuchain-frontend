import { z } from 'zod';

export const documentFormSchema = z.object({
    document: z.instanceof(File, {
        message: 'Document is required',
    }).optional(),
    recipientAddress: z.string().min(1, {
        message: 'Recipient address is required',
    }),
    forMe: z.boolean(),
});
