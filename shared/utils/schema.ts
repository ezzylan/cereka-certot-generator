import * as z from "zod";

export const certotSchema = z.object({
  title: z.string().describe("The story title"),
  story: z.string().describe("The story content"),
});

export type Certot = z.infer<typeof certotSchema>;

export const inputSchema = z.object({
  context: z.string().nonempty(),
  limit: z.enum(accuracyEnum).default(5),
  prevOutput: certotSchema.optional(),
});

export type CertotInput = z.infer<typeof inputSchema>;

export const authSchema = z.object({
  username: z.string().nonempty(),
});

export type Auth = z.infer<typeof authSchema>;
