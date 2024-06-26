"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { InvoiceProps, MessageProps } from "@/types"
import { format } from "date-fns"

export const columns: ColumnDef<MessageProps>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({row}) => <span>{format(row.original.date,"MMMM do, yyyy")}</span>
  },
  {
    accessorKey: "fromName",
    header: "From",
  },
  {
    accessorKey: "fromRole",
    header: "Role",
  },
  // {
  //   accessorKey: "property_unit",
  //   header: "Property/Unit",
  //   cell: ({row}) => <span>{row.original.propertyName}/{row.original.unitName}</span>
  // },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({row}) => {
  //     if (row.original.status) {
  //         return <p className="text-green-600 bg-green-100 px-4 py-2 rounded-lg">Paid</p> 
  //     } else {
  //         return <p className="text-red-600 bg-red-100 px-4 py-2 rounded-lg">Due</p> 
  //     }
  //   }        
  // },
  {
    accessorKey: "read",
    header: "Status",
    cell: ({row}) => {
      if (row.original.read) {
          return <p className="">Read</p> 
      } else {
          return <p className="text-red-600">Unread</p> 
      }
    }        
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  }
]
