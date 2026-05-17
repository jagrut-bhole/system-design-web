import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from '@/lib/db/prisma';

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),

    baseURL: process.env.BETTER_AUTH_URL,

    secret: process.env.BETTER_AUTH_SECRET,

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        autoSignIn: true,
        revokeSessionsOnPasswordReset: true,
    },

    session: {
        expiresIn: 60 * 60 * 24 * 20, // 20 days
        updateAge: 60 * 60 * 24 * 10, // 10 days
    },
    
    advanced: {
        ipAddress: {
            disableIpTracking: false,

            ipAddressHeaders: [
                "x-client-ip",
                "x-forwarded-for",
                "cf-connecting-ip",
                "x-real-ip",
            ]
        },

        crossSubDomainCookies: {
            enabled: true
        },

        defaultCookieAttributes: {
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        }
    }
})