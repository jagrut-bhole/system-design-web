import { ERROR_MESSAGES } from "@/constants/reponse-messages";
import { ERROR_CODES } from "@/constants/response-codes";

type ErrorMessage = string;

/**
 * Helper function to get the correct HTTP status code for an error message
 * @param message - The error message to look up
 * @returns The corresponding HTTP status code, or 500 if not found
 */
export function getStatusCodeForMessage(message: ErrorMessage): number {
  // Iterate through all error message categories
  for (const category of Object.values(ERROR_MESSAGES)) {
    for (const [key, value] of Object.entries(category)) {
      if (value === message) {
        // Find corresponding error code
        const errorCodeKey = key;

        // Search in ERROR_CODES for matching key
        for (const codeCategory of Object.values(ERROR_CODES)) {
          if (errorCodeKey in codeCategory) {
            return codeCategory[errorCodeKey as keyof typeof codeCategory] as number;
          }
        }
      }
    }
  }

  // Fallback to internal server error if message not found
  return ERROR_CODES.SERVER.INTERNAL_SERVER_ERROR;
}

/**
 * Helper function to get all error messages for a specific category
 * @param category - The category name (e.g., 'AUTH', 'USER', 'COMMON')
 * @returns Object containing all messages in that category
 */
export function getErrorsByCategory(
  category: keyof typeof ERROR_MESSAGES
): Record<string, string> {
  return ERROR_MESSAGES[category];
}

/**
 * Helper function to get all status codes for a specific category
 * @param category - The category name (e.g., 'AUTH', 'USER', 'SERVER')
 * @returns Object containing all codes in that category
 */
export function getCodesByCategory(
  category: keyof typeof ERROR_CODES
): Record<string, number> {
  return ERROR_CODES[category];
}

/**
 * Helper function to create a standardized error response
 * @param message - The error message
 * @param statusCode - Optional custom status code (if not provided, it will be looked up)
 * @returns Standardized error object
 */
export function createErrorResponse(
  message: ErrorMessage,
  statusCode?: number
): {
  success: boolean;
  message: string;
  statusCode: number;
  timestamp: string;
} {
  return {
    success: false,
    message,
    statusCode: statusCode || getStatusCodeForMessage(message),
    timestamp: new Date().toISOString(),
  };
}

/**
 * Helper function to create a standardized success response
 * @param data - The response data
 * @param message - Optional success message
 * @returns Standardized success object
 */
export function createSuccessResponse<T>(
  data: T,
  message: string = "Success"
): {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
  timestamp: string;
} {
  return {
    success: true,
    message,
    data,
    statusCode: ERROR_CODES.COMMON.SUCCESS,
    timestamp: new Date().toISOString(),
  };
}



/**
 * USAGE
    import { getStatusCodeForMessage, createErrorResponse } from "@/helpers/errorHelper";
    import { ERROR_MESSAGES } from "@/constants/reponse-messages";

    // Automatically get status code
    const code = getStatusCodeForMessage(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS); // Returns 401

    // Create standardized error response
    const response = createErrorResponse(ERROR_MESSAGES.API.INTERNAL_SERVER_ERROR); 
    // Returns: { success: false, message: "...", statusCode: 500, timestamp: "..." }
 */