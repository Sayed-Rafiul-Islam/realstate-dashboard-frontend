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
      accessorKey: "type",
      header: "Maintainance Type",
      cell: ({row}) => <span>{row.original.type && row.original.type.type}</span>
    },
    // {
    //   accessorKey: "responsibility",
    //   header: "Responsibility",
    // },
    {
      cell: ({row}) => <span>{row.original.cost} BDT</span>,
      header: "Amount",
    },
    {
      header: "Payment",
      cell: ({row}) => {
        if (row.original.paymentStatus === "Paid") {
            return <p className="text-indigo-600 bg-indigo-100 px-4 py-2 rounded-lg">Paid</p> 
        }
        else if (row.original.paymentStatus === "Due") {
            return <p className="text-red-600 bg-red-100 px-4 py-2 rounded-lg">Due</p> 
        } else {
            return <p className="text-amber-600 bg-amber-100 px-3 py-2 rounded-lg">Pending</p> 
        }
      }        
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
