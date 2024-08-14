import { Role } from "@/supabase/migrations/validation";
import { headers } from "next/headers";

export const getFromHeaders = () => {
  const heads = headers();
  const shopId = heads.get("x-shopId") as string;
  const userId = heads.get("x-userId") as string;
  const userEmail = heads.get("x-userEmail") as string;
  const memberRole = heads.get("x-memberRole") as Role;
  return { shopId, userId, memberRole, userEmail };
};
