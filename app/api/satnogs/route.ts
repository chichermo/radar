// app/api/satnogs/route.js
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = "https://network.satnogs.org/api/observations/?format=json";
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Failed to fetch SatNOGS data");
    }
    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error in /api/satnogs:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}