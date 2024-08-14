import { SelectProductType } from "@/supabase/migrations/validation";

export const calcProfit = (product: SelectProductType) => {
  return product.price - product.cost - product.commission;
};
