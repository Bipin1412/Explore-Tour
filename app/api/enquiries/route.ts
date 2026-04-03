import { NextResponse } from "next/server";
import { createEnquiry } from "@/lib/enquiry-store";
import { sendEnquiryEmail } from "@/lib/mailer";
import { getEnquirySchema } from "@/lib/validators/enquiry";
import { EnquiryVariant } from "@/types/enquiry";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const variant = payload?.variant as EnquiryVariant | undefined;

    if (!variant) {
      return NextResponse.json(
        {
          success: false,
          error: "Enquiry variant is required."
        },
        { status: 400 }
      );
    }

    const schema = getEnquirySchema(variant);
    const parsed = schema.safeParse(payload?.data);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid enquiry data",
          details: parsed.error.flatten()
        },
        { status: 400 }
      );
    }

    const enquiry = await createEnquiry(variant, parsed.data);
    await sendEnquiryEmail(enquiry);

    return NextResponse.json({
      success: true,
      enquiryId: enquiry.id
    });
  } catch (error) {
    console.error("Enquiry route error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unable to submit enquiry";

    return NextResponse.json(
      {
        success: false,
        error: process.env.NODE_ENV === "development" ? errorMessage : "Unable to submit enquiry"
      },
      { status: 500 }
    );
  }
}
