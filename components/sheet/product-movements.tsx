"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useClearSearchParams } from "@/hooks";
import { useRouter } from "@/navigation";
import { SelectMovementTypeWithUser } from "@/supabase/migrations/validation";
import { useTranslations } from "next-intl";
import { DataTable } from "../data-table";
import { movementUserColumns } from "../data-table/columns/movement";

export async function ProductMovementsSheet({
  data,
}: {
  data: SelectMovementTypeWithUser[];
}) {
  const t = useTranslations();
  const router = useRouter();
  const { path } = useClearSearchParams({ keys: ["row", "action"] });

  return (
    <Sheet
      defaultOpen
      onOpenChange={(open) => {
        if (open) return;
        router.push(path);
      }}
    >
      <SheetContent className='sm:max-w-lg'>
        <SheetHeader>
          <SheetTitle>{t("Product Movements")}</SheetTitle>
          <SheetDescription>
            {data.length} {t("movement")}
          </SheetDescription>
        </SheetHeader>
        <DataTable columns={movementUserColumns} data={data} />
      </SheetContent>
    </Sheet>
  );
}
