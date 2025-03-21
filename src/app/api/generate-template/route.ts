import { NextRequest, NextResponse } from "next/server";
import { Bio, Project, Theme, TemplateType } from "@/types";

interface RequestBody {
  bio: Bio;
  projects: Project[];
  theme: Theme;
  selectedTemplate: TemplateType;
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const { bio, projects, theme, selectedTemplate } = body;

    // In a real implementation, we would use a server-side rendering approach
    // For now, we'll return the data and let the client handle the rendering
    return NextResponse.json({
      data: {
        bio,
        projects,
        theme,
        selectedTemplate,
      },
    });
  } catch (error) {
    console.error("Error processing template data:", error);
    return NextResponse.json(
      { error: "Failed to process template data" },
      { status: 500 }
    );
  }
}
