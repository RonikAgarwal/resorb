import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Mock credentials for demo
    const validEmail = process.env.ADMIN_EMAIL || "admin@resorb.in";
    const validPassword = process.env.ADMIN_PASSWORD || "resorb2025";

    if (email === validEmail && password === validPassword) {
      const response = NextResponse.json({ success: true });
      
      // Set HTTP-only cookie for session
      response.cookies.set("resorb_admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "An error occurred" },
      { status: 500 }
    );
  }
}
