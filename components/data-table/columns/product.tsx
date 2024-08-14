"use client";

import { SortBtn } from "@/components/button";
import { RowActionDropdown } from "@/components/dropdown";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetShopId } from "@/hooks";
import { Link } from "@/navigation";
import {
  SelectProductType,
  SelectProductTypeWithCategory,
} from "@/supabase/migrations/validation";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

const columns: ColumnDef<SelectProductTypeWithCategory>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortBtn text='Name' column={column} />,
  },
  {
    accessorKey: "category.name",
    header: ({ column }) => <SortBtn text='Category' column={column} />,
    cell: ({ row }) => {
      const data = row.original;
      const { color, name } = data.category || {};
      return (
        <div className='flex items-center gap-4'>
          {color && (
            <div
              style={{ background: color }}
              className='rounded-md h-6 w-6 active:scale-105'
            />
          )}
          {name}
        </div>
      );
    },
  },
  {
    accessorKey: "initialStock",
    header: ({ column }) => <SortBtn text='Initial Stock' column={column} />,
    meta: {
      filterVariant: "range",
    },
  },
  {
    accessorKey: "currentStock",
    header: ({ column }) => <SortBtn text='Current Stock' column={column} />,
    meta: {
      filterVariant: "range",
    },
  },
  {
    accessorKey: "cost",
    header: ({ column }) => <SortBtn text='Cost' column={column} />,
    meta: {
      filterVariant: "range",
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => <SortBtn text='Price' column={column} />,
    meta: {
      filterVariant: "range",
    },
  },
  {
    accessorKey: "commission",
    header: ({ column }) => <SortBtn text='Commission' column={column} />,
    meta: {
      filterVariant: "range",
    },
  },
  {
    accessorKey: "barcode",
    header: ({ column }) => <SortBtn text='Barcode' column={column} />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortBtn text='Status' column={column} />,
    meta: {
      filterVariant: "select",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return <Actions data={data} />;
    },
  },
];

export const productColumns = columns;

const Actions = ({ data }: { data: SelectProductType }) => {
  const t = useTranslations();
  const shopId = useGetShopId();
  const searchParams = useSearchParams();
  const updatedSearchParams = new URLSearchParams(searchParams);
  updatedSearchParams.set("row", data.id);

  return (
    <div className='flex'>
      <Link
        href={`/${shopId}/products?${updatedSearchParams.toString()}&action=movements`}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='ghost' size='sm'>
              <ArrowUpDown size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("View Movements")}</p>
          </TooltipContent>
        </Tooltip>
      </Link>
      <RowActionDropdown id={data.id!} hiddenBtns={["view", "delete"]} />
    </div>
  );
};
