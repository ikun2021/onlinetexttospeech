import { NextResponse } from "next/server";
import { VOICES, LANGUAGES } from "@/data/mock-voices";

export async function GET() {
  return NextResponse.json({
    code: 0,
    message: "success",
    data: {
      voices: VOICES,
      languages: LANGUAGES,
    },
  });
}
