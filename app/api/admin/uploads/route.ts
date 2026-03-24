import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const uploadDirectory = path.join(process.cwd(), "public", "uploads");
const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function extensionForMimeType(mimeType: string) {
  if (mimeType === "image/jpeg") return "jpg";
  if (mimeType === "image/png") return "png";
  if (mimeType === "image/webp") return "webp";
  if (mimeType === "image/gif") return "gif";
  return "bin";
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      throw new Error("Image file is required.");
    }

    if (!allowedMimeTypes.has(file.type)) {
      throw new Error("Only JPG, PNG, WEBP, and GIF images are allowed.");
    }

    await fs.mkdir(uploadDirectory, { recursive: true });

    const extension = extensionForMimeType(file.type);
    const fileName = `${Date.now()}-${randomUUID()}.${extension}`;
    const filePath = path.join(uploadDirectory, fileName);
    const arrayBuffer = await file.arrayBuffer();

    await fs.writeFile(filePath, Buffer.from(arrayBuffer));

    return NextResponse.json({
      success: true,
      url: `/uploads/${fileName}`
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unable to upload image."
      },
      { status: 400 }
    );
  }
}
