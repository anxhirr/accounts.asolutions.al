import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SelectShopType } from "@/supabase/migrations/validation";

export function ShopCard({ data }: { data: SelectShopType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>{data.description}.</CardDescription>
      </CardHeader>
    </Card>
  );
}
