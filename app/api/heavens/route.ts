// app/api/heavens/route.js
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = "http://api.heavens-above.com/satinfo?satid=25544";
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Failed to fetch Heavens-Above data");
    }
    const data = await response.text();
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error in /api/heavens:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}