import { getAuthenticatedUser, requireAuthentication } from "@/helpers/authHelper";
import prisma from "@/lib/db/prisma";
import { ERROR_MESSAGES, SUCCESS_MESSAGE } from "@/constants/reponse-messages";
import { ERROR_CODES, SUCCESS_CODES } from "@/constants/response-codes";
import { NextRequest, NextResponse } from "next/server";
import { createErrorResponse, createSuccessResponse } from "@/helpers/errorHelper";
import { userSessionDeleteRequest } from "@/types/user/user";


export async function GET() {
    try {
        const authError = await requireAuthentication();

        if(authError) return authError;

        const session = await getAuthenticatedUser();

        const userSessions = await prisma.session.findMany({
            where: {
                userId: session?.user.id
            },
            select: {
                id: true,
                token: true,
                ipAddress: true,
                createdAt: true,
                expiresAt: true
            }
        });

        if (!userSessions) {
            return NextResponse.json(
                createErrorResponse(ERROR_MESSAGES.USER.FAILED_TO_FETCH),
                {
                    status: ERROR_CODES.SERVER.INTERNAL_SERVER_ERROR
                }
            )
        }

        return NextResponse.json(
            createSuccessResponse(userSessions, SUCCESS_MESSAGE.USER.USER_SESSIONS.FETCHED),
            {
                status: SUCCESS_CODES.COMMON.SUCCESS
            }
        )
    } catch (error) {
        console.log("Error at /api/user/sessions: [GET]", error);
        return NextResponse.json(
            createErrorResponse(ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG),
            {
                status: ERROR_CODES.SERVER.INTERNAL_SERVER_ERROR
            }
        )
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const authError = await requireAuthentication();

        if (authError) return authError;

        const session = await getAuthenticatedUser();

        const data = await req.json();

        const validation = userSessionDeleteRequest.safeParse(data); 

        if (!validation.success) {
            return NextResponse.json(
                createErrorResponse(ERROR_MESSAGES.COMMON.BAD_REQUEST),
                {
                    status: ERROR_CODES.COMMON.BAD_REQUEST
                }
            )
        }

        const { sessionId } = validation.data;

        const userSession = await prisma.session.delete({
            where: {
                id: sessionId
            }
        });

        if (!userSession) {
            return NextResponse.json(
                createErrorResponse(ERROR_MESSAGES.USER.FAILED_TO_DELETE),
                {
                    status: ERROR_CODES.SERVER.INTERNAL_SERVER_ERROR
                }
            )
        }

        return NextResponse.json(
            createSuccessResponse(userSession, SUCCESS_MESSAGE.USER.USER_SESSIONS.DELETED),
            {
                status: SUCCESS_CODES.COMMON.SUCCESS
            }
        )

    } catch (error) {
        console.log("Error at /api/user/sessions: [DELETE] ", error);
        return NextResponse.json(
            createErrorResponse(ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG),
            {
                status: ERROR_CODES.SERVER.INTERNAL_SERVER_ERROR
            }
        )
    }
}