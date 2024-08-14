import { SignupForm } from "@/components/form";
import { AuthWrapper } from "@/components/wrappers";
import { member, user as schUser, shop } from "@/supabase/migrations/schema";
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

        //TODO: handle this case, auth is successful but user is not created
        if (!user) return { path: `/login` };

        const userId = user.id;
        await db.transaction(async (tx) => {
          // 1. create user
          await tx.insert(schUser).values({
            id: userId, // use same id as auth user
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
          });
          // 2. Create a shop
          const [resShop] = await tx
            .insert(shop)
            .values({
              name: "My First Shop",
              description: "This is my first shop",
              userId,
            })
            .returning({
              id: shop.id,
            });

          // 3. Create a member
          await tx.insert(member).values({
            userId,
            shopId: resShop.id,
          });
        });

        // TODO: if transaction fails, delete user

        const path = searchParams.redirectUrl || "/shop";
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
