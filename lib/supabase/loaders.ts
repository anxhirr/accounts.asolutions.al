import { categories } from "@/supabase/migrations/schema";
import { getFromHeaders } from "@/utils";
import { db } from "@/utils/supabase/database";
import { eq } from "drizzle-orm";

export const getCategories = async () => {
  const { shopId } = getFromHeaders();
  const categoriesList = await db.query.categories.findMany({
    where: eq(categories.shopId, shopId),
  });
  return categoriesList;
};
