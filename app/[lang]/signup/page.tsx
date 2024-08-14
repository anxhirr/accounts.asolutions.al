import { SignupForm } from "@/components/form";
import { AuthWrapper } from "@/components/wrappers";
import { user as schUser } from "@/supabase/migrations/schema";
import { db } from "@/utils/supabase/database";
import { createClient } from "@/utils/supabase/server";

type Args = {
  searchParams: { redirectUrl?: string };
};

async function SignupPage({ searchParams }: Args) {
  return (
    <SignupForm
      performAction={async (values) => {
        "use server";
        const supabase = createClient();
        const { error, data } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });

        if (error) throw error;

        const { user } = data;

        if (!user) return { path: `/login` };

        const userId = user.id;
        await db.insert(schUser).values({
          id: userId, // use same id as auth user
          email: values.email,
        });

        const path = searchParams.redirectUrl || "/";
        return { path };
      }}
    />
  );
}

export default (args: Args) =>
  AuthWrapper({
    children: <SignupPage {...args} />,
    condition: "unauthenticated",
  });
