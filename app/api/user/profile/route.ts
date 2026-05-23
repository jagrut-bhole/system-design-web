import { getAuthenticatedUser, requireAuthentication } from "@/helpers/authHelper";
import prisma from "@/lib/db/prisma";
import { ERROR_MESSAGES, SUCCESS_MESSAGE } from "@/constants/reponse-messages";
import { NextRequest, NextResponse } from "next/server";
import { ERROR_CODES, SUCCESS_CODES } from "@/constants/response-codes";
import { updateProfileSchemaRequest } from "@/types/user/user";
import { createSuccessResponse, createErrorResponse } from "@/helpers/errorHelper";

export async function POST(req: NextRequest) {
	try {
		// Middleware: Check if user is authenticated
		const authError = await requireAuthentication();
		if (authError) return authError;

		// Get authenticated user
		const session = await getAuthenticatedUser();

		// Parse request body
		const data = await req.json();

		// Validate request data
		const validation = updateProfileSchemaRequest.safeParse(data);

		if (!validation.success) {
			return NextResponse.json(
				createErrorResponse(ERROR_MESSAGES.VALIDATION.INVALID_FORMAT),
				{
					status: ERROR_CODES.COMMON.BAD_REQUEST,
				},
			);
		}

		const { name } = validation.data;

		// Update user profile
		const updatedUser = await prisma.user.update({
			where: {
				id: session?.user.id,
			},
			data: {
				name,
			},
		});

		return NextResponse.json(
			createSuccessResponse(updatedUser, SUCCESS_MESSAGE.USER.PROFILE_UPDATED),
			{
				status: SUCCESS_CODES.COMMON.SUCCESS
			}
		);
	} catch (error) {
		console.log("Error in /api/user/profile: ", error);

		return NextResponse.json(
			createErrorResponse(ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG),
			{
				status: ERROR_CODES.SERVER.INTERNAL_SERVER_ERROR,
			},
		);
	}
}

export async function GET() {
	try {
		const authError = await requireAuthentication();

		if (authError) {
			return authError;
		}

		const session = await getAuthenticatedUser();

		const user = await prisma.user.findUnique({
			where: {
				id: session?.user.id,
			},
			select: {
				id: true,
				name: true,
				email: true,
				image: true,
				createdAt: true,
				dailyCreditLimit: true,
			}
		});

		if (!user) {
			return NextResponse.json(
				createErrorResponse(ERROR_MESSAGES.USER.NOT_FOUND),
				{
					status: ERROR_CODES.COMMON.NOT_FOUND,
				},
			);
		}

		return NextResponse.json(
			createSuccessResponse(user, SUCCESS_MESSAGE.USER.PROFILE_FETCHED),
			{
				status: SUCCESS_CODES.COMMON.SUCCESS,
			}
		);
	} catch (error) {
		console.log("Error at /api/user/profile: ", error);

		return NextResponse.json(
			createErrorResponse(ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG),
			{
				status: ERROR_CODES.SERVER.INTERNAL_SERVER_ERROR,
			},
		);
	}
}
