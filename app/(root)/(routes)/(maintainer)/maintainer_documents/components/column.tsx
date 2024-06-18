"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { DocumentProps } from "@/types"


export const columns: ColumnDef<DocumentProps>[] = [
  {
    header: "SL",
    cell: ({row}) => <span>{row.index + 1}</span>
  },
  {
    accessorKey: "typeName",
    header: "Document Type",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => {
      if (row.original.status === "Accepted") {
          return <p className="text-green-600 bg-green-100 px-4 py-2 rounded-lg">Accepted</p> 
      }
      else if (row.original.status === "Declined") {
          return <p className="text-red-600 bg-red-100 px-4 py-2 rounded-lg">Declined</p> 
      } else {
          return <p className="text-amber-600 bg-amber-100 px-4 py-2 rounded-lg">Pending</p> 
      }
    } 
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
]
