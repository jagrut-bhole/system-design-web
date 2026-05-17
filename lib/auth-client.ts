import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { API_ROUTES } from "@/constants/API_ROUTES/route";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    basePath: API_ROUTES.AUTH,
    plugins: [
        inferAdditionalFields({
            user: {
                name: {
                    type: "string",
                    required: true
                }
            },
        }),
    ],
    fetchOptions: {
        credentials: "include"
    }
});

export const {
    signIn,
    signUp,
    signOut,
    useSession,
    getSession,
} = authClient;