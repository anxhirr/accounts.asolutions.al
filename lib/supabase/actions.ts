import {
  categories,
  products,
  subscription,
} from "@/supabase/migrations/schema";
import {
  InsertCategoryFormType,
  InsertProductFormType,
} from "@/supabase/migrations/validation";
import { getFromHeaders } from "@/utils";
import { db } from "@/utils/supabase/database";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createProduct = async (values: InsertProductFormType) => {
  "use server";
  const { userId, shopId } = getFromHeaders();

  await db.insert(products).values({
    ...values,
    shopId,
    currentStock: values.initialStock,
    userId,
  });

  revalidatePath("/[lang]/[shopId]/products");
};

export const createCategory = async (values: InsertCategoryFormType) => {
  "use server";
  const { shopId } = getFromHeaders();
  await db.insert(categories).values({
    ...values,
    shopId,
  });
  revalidatePath("/[lang]/[shopId]/products/create"); //TODO: can optimize this
};

export const getSubscription = async () => {
  "use server";
  const { shopId } = getFromHeaders();
  const data = await db.query.subscription.findFirst({
    where: eq(subscription?.shopId, shopId),
  });
  return data;
};
