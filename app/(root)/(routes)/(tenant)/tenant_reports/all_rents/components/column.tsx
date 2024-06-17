"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { RentProps, TenantProps } from "@/types"
import { format } from "date-fns"

export const columns: ColumnDef<RentProps>[] = [
  {
    accessorKey: "dateOfPayment",
    header: "Date",
    cell: ({row}) => <span>{format(row.original.dateOfPayment,"MMMM do, yyyy")}</span>
  },
  {
    accessorKey: "month_year",
    header: "Month/Year",
    cell: ({row}) => <span>{row.original.month}/{row.original.year}</span>
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => <p className="text-green-600 bg-green-100 px-4 py-2 rounded-lg">Paid</p>       
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
]
