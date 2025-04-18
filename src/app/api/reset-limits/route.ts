import { NextRequest, NextResponse } from "next/server";
import { Client, Databases, Permission, Query } from "node-appwrite";

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

// Endpoint to reset AI request limits for all users
// Can be called by a scheduled job (e.g., cron job)
export async function POST(req: NextRequest) {
  try {
    // Optional API key check to secure this endpoint
    const { searchParams } = new URL(req.url);
    const apiKey = searchParams.get("key");

    if (apiKey !== process.env.APPWRITE_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all user documents
    const users = await databases.listDocuments(
      DATABASE_ID,
      USER_COLLECTION_ID,
      [Query.limit(100)] // Adjust based on your expected volume
    );

    let successCount = 0;
    let failureCount = 0;

    // Reset limits for each user
    for (const user of users.documents) {
      try {
        const allowedRequestsPerDay = user.allowedRequestsPerDay || 10;

        await databases.updateDocument(
          DATABASE_ID,
          USER_COLLECTION_ID,
          user.$id,
          { remainingRequests: allowedRequestsPerDay }
        );

        successCount++;
      } catch (error) {
        console.error(
          `[Server] Failed to reset limits for user ${user.$id}:`,
          error
        );
        failureCount++;
      }
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: `Reset request limits for ${successCount} users with ${failureCount} failures`,
      total: users.total,
      reset: successCount,
      failed: failureCount,
    });
  } catch (error) {
    console.error("[Server] Error resetting request limits:", error);
    return NextResponse.json(
      { error: "Failed to reset request limits" },
      { status: 500 }
    );
  }
}

// Handle GET requests (useful for simple verification)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const apiKey = searchParams.get("key");

  if (apiKey !== process.env.APPWRITE_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    ready: true,
    message: "Endpoint ready. Use POST to trigger the reset.",
  });
}
