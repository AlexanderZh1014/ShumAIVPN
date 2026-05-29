import { NextResponse } from "next/server";
import { sendVerificationEmail } from "../../../lib/email";

export async function GET() {
  try {

    await sendVerificationEmail(
      "alexanderzh1014@gmail.com",
      "test123"
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error: "Failed",
      },
      {
        status: 500,
      }
    );
  }
}