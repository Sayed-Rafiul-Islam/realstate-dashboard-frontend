"use client"

import { ColumnDef } from "@tanstack/react-table"
import { OrderProps } from "@/types"

export const columns: ColumnDef<OrderProps>[] = [
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
  }
]
