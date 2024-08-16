import { LoginForm, LoginSchemaType } from "@/components/form";
import { AuthWrapper } from "@/components/wrappers";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

type Args = {
  searchParams: { redirectUrl?: string };
};
async function LoginPage({ searchParams }: Args) {
  const signIn = async (values: LoginSchemaType) => {
    "use server";
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword(values);
    if (error) throw error;
    if (process.env.NODE_ENV === "production") {
      console.log("Setting cookie");
      cookies().set("sb-auth", JSON.stringify(data.session), {
        // cookie options
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        domain: ".asolutions.al",
        expires: new Date(data.session?.expires_at?.toString() || 0),
      });
      console.log("Cookie set");
    }
    const path = searchParams.redirectUrl || `/`;
    return { path };
  };

  return <LoginForm performAction={signIn} />;
}

export default (args: Args) =>
  AuthWrapper({
    children: <LoginPage {...args} />,
    condition: "unauthenticated",
  });
