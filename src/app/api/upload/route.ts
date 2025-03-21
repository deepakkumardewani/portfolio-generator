import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const freeimageFormData = new FormData();
    freeimageFormData.append("source", image);

    const response = await fetch(
      `${process.env.FREEIMAGE_BASE_URL}?key=${process.env.FREEIMAGE_API_KEY}`,
      {
        method: "POST",
        body: freeimageFormData,
      }
    );

    if (!response.ok) {
      throw new Error("Upload to FreeImage failed");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
