import { z } from "zod";

export const updateProfileSchemaRequest = z.object({
    name: z.string().min(3, "Name should consist of minimum 3 characters")
});

export const userSessionDeleteRequest = z.object({
    sessionId: z.string().min(1, "Session ID is required")
})