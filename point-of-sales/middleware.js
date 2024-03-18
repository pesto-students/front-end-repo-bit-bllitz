import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
export async function middleware(req) {
  const res = NextResponse.next();
  //initiate createMiddlewareClient
  const supabase = createMiddlewareClient({ req, res });
  //check if session exists
  const { data: sessionData } = await supabase.auth.getSession();
  console.log("session in middleware", sessionData);
  if (!sessionData) {
    return NextResponse.rewrite(new URL("/auth/signin", req.url));
  }
  return res;
}


export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};
