import { LoginForm, LoginSchemaType } from "@/components/form";
import { AuthWrapper } from "@/components/wrappers";
import { createClient } from "@/utils/supabase/server";

type Args = {
  searchParams: SearchParams;
};
async function LoginPage({ searchParams }: Args) {
  const signIn = async (values: LoginSchemaType) => {
    "use server";
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword(values);
    if (error) throw error;
    // setSbCookie(data.session);
    const path = searchParams.redirectUrl || `/`;
    return { path };
  };

  return <LoginForm performAction={signIn} />;
}

export default (args: Args) =>
  AuthWrapper({
    children: <LoginPage {...args} />,
    condition: "unauthenticated",
    ...args,
  });
