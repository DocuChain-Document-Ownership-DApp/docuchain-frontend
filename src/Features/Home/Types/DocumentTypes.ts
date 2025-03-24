import { z } from "zod";
import { documentFormSchema } from "@/Features/Home/Schemas/DocumentFormSchema.ts";

export type DocumentFormData = z.infer<typeof documentFormSchema>;
