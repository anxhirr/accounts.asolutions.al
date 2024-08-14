import { SignOutBtn } from "@/components/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect(`/login`);
  };
  return (
    <div>
      hello
      <SignOutBtn performAction={signOut} />
    </div>
  );
}
