import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string(),
  slug: z
    .string()
    .regex(/^[a-zA-Z0-9_-]*$/)
    .min(5)
    .max(20),
  noteText: z.string().optional().nullable(),
  informationText: z.string().optional().nullable(),
  reviewText: z.string().optional().nullable(),
  thanksText: z.string().optional().nullable(),
  backgroundColor: z.string().optional().nullable(),
});

export type ProductType = z.infer<typeof ProductSchema>;

export const GRADIENTS_CLASSES = [
  "bg-gradient-to-r from-rose-400 to-red-500",
  "bg-gradient-to-r from-amber-500 to-pink-500",
  "bg-gradient-to-r from-blue-200 to-cyan-200",
  "bg-gradient-to-r from-violet-200 to-pink-200",
];
