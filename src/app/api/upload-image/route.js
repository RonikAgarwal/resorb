import { NextResponse } from "next/server";
import crypto from "crypto";

// POST /api/upload-image — Generate Cloudinary signed upload params
// The actual upload happens client-side directly to Cloudinary
export async function POST(request) {
  try {
    const { folder } = await request.json();

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { success: false, error: "Cloudinary not configured" },
        { status: 500 }
      );
    }

    const timestamp = Math.round(Date.now() / 1000);
    const uploadFolder = folder || "products";

    // Generate signature for signed upload
    const paramsToSign = `folder=${uploadFolder}&timestamp=${timestamp}`;
    const signature = crypto
      .createHash("sha256")
      .update(paramsToSign + apiSecret)
      .digest("hex");

    return NextResponse.json({
      success: true,
      cloudName,
      apiKey,
      timestamp,
      signature,
      folder: uploadFolder,
    });
  } catch (error) {
    console.error("Error generating upload signature:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate upload signature" },
      { status: 500 }
    );
  }
}
