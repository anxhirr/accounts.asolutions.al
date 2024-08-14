import { headers } from "next/headers";

export const getFromHeaders = () => {
  const heads = headers();
  const userId = heads.get("x-userId") as string;
  const userEmail = heads.get("x-userEmail") as string;
  return { userId, userEmail };
};
