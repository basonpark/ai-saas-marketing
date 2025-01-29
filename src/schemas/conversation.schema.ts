import { ZodType, z } from "zod";

export const ConversationSearchSchema = z.object({
  query: z.string().min(1, { message: "You must enter a search query" }),
  domain: z.string().min(1, { message: "You must select a domain" }),
});

export type ConversationSearchProps = {
    query: string
    domain: string
}