"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

function AuthRedirector() {
    const {data: session, isPending} = authClient.useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo");

    useEffect(() => {
        if (!isPending && session) {
            router.replace(redirectTo || "/");
        }
    },[session, isPending, redirectTo, router]);

    return null;
}

export default function AuthLayout({
    children
} : {
    children: React.ReactNode
}) {
    return (
        <>
            <Suspense fallback={null}>
                <AuthRedirector />
            </Suspense>
            {children}
        </>
    )
}