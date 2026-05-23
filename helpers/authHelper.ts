import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { ERROR_MESSAGES } from "@/constants/reponse-messages";
import { ERROR_CODES } from "@/constants/response-codes";
import { createErrorResponse } from "@/helpers/errorHelper";

/**
 * Checks if user session exists
 * @returns User session object if valid, null if not authenticated
 */
export const getAuthenticatedUser = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    return session;
};

/**
 * Middleware function for API routes - checks authentication and returns error if not authenticated
 * @returns NextResponse with error if not authenticated, null if authenticated
 * 
 * Usage in API route:
 * const authError = await requireAuthentication();
 * if (authError) return authError;
 */
export const requireAuthentication = async () => {
    const session = await getAuthenticatedUser();

    if (!session) {
        return NextResponse.json(
            createErrorResponse(ERROR_MESSAGES.COMMON.UNAUTHORIZED),
            {
                status: ERROR_CODES.COMMON.UNAUTHORIZED
            }
        );
    }
    
    return null;
};

/**
 * Get authenticated user or throw error - useful for routes where you need the user data
 * @throws NextResponse error if not authenticated
 * @returns User session object
 * 
 * Usage in API route:
 * try {
 *   const user = await getAuthenticatedUserOrThrow();
 *   // Use user.id, user.email, etc.
 * } catch (error) {
 *   // Handle error
 * }
 */
export const getAuthenticatedUserOrThrow = async () => {
    const session = await getAuthenticatedUser();

    if (!session) {
        throw NextResponse.json(
            createErrorResponse(ERROR_MESSAGES.COMMON.UNAUTHORIZED),
            {
                status: ERROR_CODES.COMMON.UNAUTHORIZED
            }
        );
    }
    
    return session;
};