"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { OrderProps } from "@/types"

export const columns: ColumnDef<OrderProps>[] = [
  {
    accessorKey: "serial",
    header: "SL",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "packageName",
    header: "Package",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "gateway",
    header: "Gateway",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => {
      if (row.original.status === "Paid") {
          return <p className="text-green-600 bg-green-200 px-4 py-2 rounded-lg">Paid</p> 
      }
      else if (row.original.status === "Pending") {
          return <p className="text-amber-600 bg-amber-200 px-4 py-2 rounded-lg">Pending</p> 
      } else {
          return <p className="text-red-600 bg-red-200 px-4 py-2 rounded-lg">Canceled</p> 
      }
    }        
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
]
