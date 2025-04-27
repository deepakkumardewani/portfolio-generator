import { Client, Databases, Query } from "node-appwrite";
import logger from "@/lib/logger";
// Initialize server-side Appwrite client
const client = new Client()
  .setEndpoint(
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1"
  )
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "")
  .setKey(process.env.APPWRITE_API_KEY || "");

// Initialize Appwrite services
const databases = new Databases(client);

// Database and collections constants
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";
const USER_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID || "";

/**
 * Get user document by ID
 */
const getUserDocument = async (userId: string) => {
  try {
    // Find documents with matching userId
    const response = await databases.listDocuments(
      DATABASE_ID,
      USER_COLLECTION_ID,
      [Query.equal("userId", userId)]
    );

    if (response.total === 0) {
      logger.info(`[Server] No user document found for userId: ${userId}`);
      // Instead of throwing error, return null to handle gracefully
      return null;
    }

    return response.documents[0];
  } catch (error) {
    logger.error(`[Server] Error getting user document: ${error}`);
    // Return null instead of throwing so callers can handle gracefully
    return null;
  }
};

/**
 * Get the remaining requests count for a user (server-side)
 */
export const getRemainingRequests = async (
  userId: string
): Promise<{
  remainingRequests: number;
  allowedRequestsPerDay: number;
}> => {
  try {
    const document = await getUserDocument(userId);

    // If no document exists, return default values
    if (!document) {
      logger.info(
        `[Server] Using default request limits for userId: ${userId}`
      );
      return {
        remainingRequests: 10, // Default value for new users
        allowedRequestsPerDay: 10,
      };
    }

    return {
      remainingRequests: document.remainingRequests ?? 10, // Use nullish coalescing to handle undefined
      allowedRequestsPerDay: document.allowedRequestsPerDay ?? 10,
    };
  } catch (error) {
    logger.error(`[Server] Error getting remaining requests: ${error}`);
    return {
      remainingRequests: 0, // Conservative default
      allowedRequestsPerDay: 10,
    };
  }
};

/**
 * Update the remaining requests count for a user (server-side)
 */
export const updateRemainingRequests = async (
  userId: string,
  count: number
): Promise<boolean> => {
  try {
    const document = await getUserDocument(userId);

    // If document doesn't exist, we can't update it
    if (!document) {
      console.error(
        `[Server] Cannot update request count - no document for userId: ${userId}`
      );
      return false;
    }

    await databases.updateDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      document.$id,
      { remainingRequests: count }
    );

    logger.info(
      `[Server] Updated remaining requests for ${userId} to ${count}`
    );
    return true;
  } catch (error) {
    logger.error(`[Server] Error updating remaining requests: ${error}`);
    return false;
  }
};

/**
 * Reset the remaining requests for a user to their allowed daily limit (server-side)
 */
export const resetRemainingRequests = async (
  userId: string
): Promise<boolean> => {
  try {
    const document = await getUserDocument(userId);

    // If document doesn't exist, we can't reset it
    if (!document) {
      console.error(
        `[Server] Cannot reset request count - no document for userId: ${userId}`
      );
      return false;
    }

    const allowedRequests = document.allowedRequestsPerDay ?? 10;

    await databases.updateDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      document.$id,
      { remainingRequests: allowedRequests }
    );

    logger.info(
      `[Server] Reset remaining requests for ${userId} to ${allowedRequests}`
    );
    return true;
  } catch (error) {
    logger.error(`[Server] Error resetting remaining requests: ${error}`);
    return false;
  }
};
