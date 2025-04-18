import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import {
  getRemainingRequests,
  updateRemainingRequests,
} from "@/lib/server/appwriteServer";

const SYSTEM = `You are a professional portfolio description writer. Your task is to create compelling,
        concise, and well-structured descriptions that highlight achievements and skills effectively.
        Follow these guidelines:
        - Focus on impact and outcomes
        - Use active voice and strong action verbs
        - Maintain the specified tone while being authentic
        - Avoid clichés and generic statements
        - Keep descriptions between 2-4 sentences
        - Highlight unique value propositions
        - Ensure content is relevant to the target audience`;
const REFINEMENT_SYSTEM = `You are a professional portfolio description writer specializing in refining and improving content.
        Your task is to revise existing descriptions based on user feedback.
        Follow these guidelines:
        - Respect and implement the user's feedback precisely
        - Maintain the specified tone while being authentic
        - Use active voice and strong action verbs
        - Keep the refined description concise and impactful
        - Ensure the revision addresses all points in the feedback
        - Preserve the strengths of the original description
        - Focus on addressing weaknesses identified in the feedback
        - Keep descriptions between 2-4 sentences`;

export async function POST(req: NextRequest) {
  try {
    // Extract the data from the request body
    const { keywords, tone, feedback, originalDescription, userId } =
      await req.json();

    console.log("[Server] Description API request:", {
      userId,
      keywordsLength: keywords?.length,
      hasFeedback: !!feedback,
      hasOriginalDescription: !!originalDescription,
    });

    // Check if required fields are provided
    if (!keywords) {
      return NextResponse.json(
        { error: "Keywords are required" },
        { status: 400 }
      );
    }

    // Check if user ID is provided
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Get remaining requests for the user using server-side client
    let remainingRequests = 0;
    let allowedRequestsPerDay = 10;

    try {
      const result = await getRemainingRequests(userId);
      remainingRequests = result.remainingRequests;
      allowedRequestsPerDay = result.allowedRequestsPerDay;
      console.log(
        "[Server] Remaining requests:",
        remainingRequests,
        "out of",
        allowedRequestsPerDay
      );
    } catch (error) {
      console.error("[Server] Error getting remaining requests:", error);
      // If we can't get the count, use conservative defaults
      remainingRequests = 0;
    }

    // Check if user has reached the limit
    if (remainingRequests <= 0) {
      return NextResponse.json(
        {
          error: "You have reached your daily limit of AI description requests",
        },
        {
          status: 429,
          headers: {
            "X-Remaining-Requests": "0",
            "X-Allowed-Requests-Per-Day": allowedRequestsPerDay.toString(),
          },
        }
      );
    }

    // Default tone to "Professional" if not provided
    const selectedTone = tone || "Professional";

    // Determine if this is a refinement request or a new description
    const isRefinement = !!feedback && !!originalDescription;

    // Create the appropriate prompt based on whether this is a refinement or not
    let prompt;

    if (isRefinement) {
      prompt = `Refine the following description based on this feedback: "${feedback}"
      
Original description:
${originalDescription}

The description should maintain a ${selectedTone} tone and continue to be based on these keywords: ${keywords}.
Ensure the refined description addresses the specific feedback while remaining clear, engaging, and concise.`;
    } else {
      prompt = `Generate a ${selectedTone} description based on these keywords: ${keywords}.
      The description should be clear, engaging, and highlight the key points from the keywords.
      Keep it concise and appropriate for a professional portfolio.`;
    }

    // Create the system prompt with specific guidance for refinements
    const system = isRefinement ? REFINEMENT_SYSTEM : SYSTEM;

    // Update the remaining requests count using server-side client
    const newRemainingRequests = remainingRequests - 1;
    try {
      const updated = await updateRemainingRequests(
        userId,
        newRemainingRequests
      );
      if (!updated) {
        console.warn(
          "[Server] Failed to update remaining requests for user:",
          userId
        );
      }
    } catch (error) {
      console.error("[Server] Error updating remaining requests:", error);
      // Continue with generation even if update fails
    }

    // Use the streamText function to generate text with streaming
    const result = streamText({
      model: openai("gpt-4o"),
      system,
      prompt,
      temperature: 0.7,
      maxTokens: 500,
      onError({ error }) {
        console.error("[Server] Error generating description:", error);
      },
    });

    // Add headers to the response with remaining requests info
    const response = result.toDataStreamResponse();
    response.headers.set(
      "X-Remaining-Requests",
      newRemainingRequests.toString()
    );
    response.headers.set(
      "X-Allowed-Requests-Per-Day",
      allowedRequestsPerDay.toString()
    );

    return response;
  } catch (error) {
    console.error("[Server] Unhandled error in description API:", error);
    return NextResponse.json(
      { error: "Failed to generate description" },
      { status: 500 }
    );
  }
}
