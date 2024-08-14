import { redirect } from "@/navigation";
import { createClient } from "@/utils/supabase/server";

export const AuthWrapper = async ({
  children,
  condition,
}: {
  children: React.ReactNode;
  condition: "authenticated" | "unauthenticated";
}) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (condition === "authenticated" && !user) return redirect("/login");
  if (condition === "unauthenticated" && user) return redirect("/shop");

  return <>{children}</>;
};
