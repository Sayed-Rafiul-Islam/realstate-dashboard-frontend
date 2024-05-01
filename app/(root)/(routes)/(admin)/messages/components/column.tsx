"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MessageProps} from "@/types"
import { CellAction } from "./cell-action"

export const columns: ColumnDef<MessageProps>[] = [
  {
    accessorKey: "serial",
    header: "SL",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => 
      <>
        {
        row.original.status
        && <p className="text-green-600 bg-green-100 px-4 py-2 rounded-lg">Viewed</p> 
        }
      </>
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
]
