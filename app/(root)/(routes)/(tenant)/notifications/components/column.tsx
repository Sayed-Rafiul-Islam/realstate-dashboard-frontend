"use client"

import { ColumnDef } from "@tanstack/react-table"
import { PropertyProps, TenantProps, UnitProps } from "@/types"
import { format } from "date-fns";

export interface NotificationsColumn {
  date :  string,
  tenant : TenantProps,
  property : PropertyProps,
  unit : UnitProps,
  tenantName : string,
  issue : string,
  body : string
}

export const columns: ColumnDef<NotificationsColumn>[] = [
  {
    cell: ({row}) => <span>{format(row.original.date,"MMMM do, yyyy")}</span>, 
    header: "Date",
  },
  {
    accessorKey: "issue",
    header: "Issue",
  },
  {
    accessorKey: "body",
    header: "Body",
  }
]
