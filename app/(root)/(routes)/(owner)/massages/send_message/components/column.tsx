"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { MessageProps } from "@/types"
import { format } from "date-fns"

export const columns: ColumnDef<MessageProps>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({row}) => <span>{format(row.original.date,"MMMM do, yyyy")}</span>
  },
  {
    accessorKey: "toName",
    header: "To",
  },
  {
    accessorKey: "toRole",
    header: "Role",
  },
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
