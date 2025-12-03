import { NextResponse } from "next/server";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST() {
  await delay(1200);

  const bookingId =
    "IGA-" + Math.random().toString(36).slice(2, 8).toUpperCase();

  return NextResponse.json({
    success: true,
    bookingId,
  });
}
