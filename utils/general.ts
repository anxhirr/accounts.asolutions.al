import { Session } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const setSbCookie = (session: Session) => {
  if (process.env.NODE_ENV === "production") {
    console.log("Setting sb-auth cookie");
    cookies().set("sb-auth", JSON.stringify(session), {
      // cookie options
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      domain: ".asolutions.al",
      expires: new Date(session?.expires_at?.toString() || 0),
    });
    console.log("Cookie set");
  }
};
