"use client";

import { SortBtn } from "@/components/button";
import { SelectMemberTypeWithShopUser } from "@/supabase/migrations/validation";
import { ColumnDef } from "@tanstack/react-table";
import { DateCell } from "../cells/date";

const columns: ColumnDef<SelectMemberTypeWithShopUser>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => <SortBtn text='Created at' column={column} />,
    cell: ({ row }) => <DateCell date={row.original.createdAt} />,
  },
  {
    accessorKey: "shop.name",
    header: ({ column }) => <SortBtn text='Shop name' column={column} />,
  },
  {
    accessorKey: "user.email",
    header: ({ column }) => <SortBtn text='User email' column={column} />,
  },
];

export const memberColumns = columns;
