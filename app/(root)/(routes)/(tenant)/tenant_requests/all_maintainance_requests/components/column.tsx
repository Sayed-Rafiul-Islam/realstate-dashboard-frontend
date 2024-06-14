"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { MaintainanceRequestProps } from "@/types"
import { format } from "date-fns"

  export const columns: ColumnDef<MaintainanceRequestProps>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({row}) => <span>{format(row.original.date,"MMMM do, yyyy")}</span>
    },
    {
      accessorKey: "requestNo",
      header: "Request No",
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({row}) => <span>{row.original.type && row.original.type.type}</span>
    },
    {
      accessorKey: "details",
      header: "Issue",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({row}) => {
        if (row.original.status === "Complete") {
            return <p className="text-indigo-600 bg-indigo-100 px-4 py-2 rounded-lg">Complete</p> 
        }
        else if (row.original.status === "Incomplete") {
            return <p className="text-red-600 bg-red-100 px-4 py-2 rounded-lg">Incomplete</p> 
        } else {
            return <p className="text-amber-600 bg-amber-100 px-3 py-2 rounded-lg">In Progress</p> 
        }
      }        
    },
    {
      id: "actions",
      cell: ({row}) => <CellAction data={row.original} />,
    }
  ]
