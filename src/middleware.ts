import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Guard: nếu thiếu Supabase env vars thì bỏ qua middleware (tránh crash)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.next();
  }

  try {
    const { updateSession } = await import("@/utils/supabase/middleware");
    return await updateSession(request);
  } catch {
    // Nếu Supabase middleware lỗi, vẫn cho request đi qua
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
