import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ template: string }> }
) {
  try {
    const { template } = await params;
    const filePath = path.join(
      process.cwd(),
      "src/app/templates",
      template.toLowerCase(),
      "index.js"
    );

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      );
    }

    const content = fs.readFileSync(filePath, "utf-8");
    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read template" },
      { status: 500 }
    );
  }
}
