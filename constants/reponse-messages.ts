// Factory functions
export const NOT_FOUND = (entity: string) => `${entity} not found.`;
export const FAILED_TO_FETCH = (entity: string) => `Failed to fetch ${entity} data.`;

export const ERROR_MESSAGES = {
	COMMON: {
		SOMETHING_WENT_WRONG: "Something went wrong.",
		NETWORK_ERROR: "Network error. Please try again.",
		UNAUTHORIZED: "You are not authorized.",
		FORBIDDEN: "Access denied.",
		NOT_FOUND: "Resource not found.",
		BAD_REQUEST: "Invalid request. Please check your input.",
		VALIDATION_ERROR: "Validation failed. Please check your data.",
	},

	AUTH: {
		INVALID_CREDENTIALS: "Invalid email or password.",
		SESSION_EXPIRED: "Session expired. Please login again.",
		EMAIL_ALREADY_EXISTS: "Email already exists.",
		PASSWORD_TOO_WEAK:
			"Password must be at least 8 characters with uppercase, lowercase, and numbers.",
		EMAIL_NOT_VERIFIED: "Please verify your email before logging in.",
		ACCOUNT_DISABLED: "Your account has been disabled.",
		TOO_MANY_LOGIN_ATTEMPTS: "Too many login attempts. Please try again later.",
		INVALID_TOKEN: "Invalid or expired token. Please login again.",
		MISSING_CREDENTIALS: "Email and password are required.",
	},

	USER: {
		NOT_FOUND: NOT_FOUND("User"),
		FAILED_TO_FETCH: FAILED_TO_FETCH("User"),
		PROFILE_UPDATE_FAILED: "Failed to update user profile.",
		PERMISSION_DENIED: "You do not have permission to perform this action on this user.",
		ACCOUNT_LOCKED: "Your account is locked. Please contact support.",
		FAILED_TO_DELETE: "Failed to delete user account.",
		SESSION_FETCHED: "User sessions fetched successfully",
	},

	API: {
		INTERNAL_SERVER_ERROR: "Internal server error. Please try again later.",
		SERVICE_UNAVAILABLE: "Service temporarily unavailable. Please try again later.",
		BAD_GATEWAY: "Bad gateway. Please try again later.",
		REQUEST_TIMEOUT: "Request timeout. Please try again.",
		TOO_MANY_REQUESTS: "Too many requests. Please wait before trying again.",
	},

	USER_SESSIONS: {
		NOT_FOUND: NOT_FOUND("User Sessions"),
		FAILED_TO_FETCH: FAILED_TO_FETCH("User Sessions"),
	},

	VALIDATION: {
		INVALID_EMAIL: "Please enter a valid email address.",
		INVALID_PASSWORD: "Password does not meet the requirements.",
		MISSING_FIELD: "Required field is missing.",
		INVALID_FORMAT: "Invalid format. Please check your input.",
		FIELD_TOO_LONG: "This field is too long.",
		FIELD_TOO_SHORT: "This field is too short.",
	},

	QUESTION: {
		NOT_FOUND: NOT_FOUND("Question"),
		FAILED_TO_FETCH: FAILED_TO_FETCH("Question"),
		FAILED_TO_CREATE: "Failed to create question.",
		FAILED_TO_UPDATE: "Failed to update question.",
		FAILED_TO_DELETE: "Failed to delete question.",
	},

	SCORE: {
		NOT_FOUND: NOT_FOUND("Score"),
		FAILED_TO_FETCH: FAILED_TO_FETCH("Score"),
		FAILED_TO_CALCULATE: "Failed to calculate score.",
	},
} as const;

export const SUCCESS_MESSAGE = {
	USER: {
		PROFILE_UPDATED: "Profile updated successfully",
		PROFILE_FETCHED: "Profile fetched successfully",

		USER_SESSIONS: {
			FETCHED: "User sessions fetched successfully",
			DELETED: "User session deleted successfully",
		},
	},
};
