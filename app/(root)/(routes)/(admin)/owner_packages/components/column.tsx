"use client"

import { ColumnDef } from "@tanstack/react-table"
import { OwnerPackageProps } from "@/types"

export const columns: ColumnDef<OwnerPackageProps>[] = [
  {
    accessorKey: "serial",
    header: "SL",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({row}) => <span>{row.original.owner.user.firstName}</span>
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({row}) => <span>{row.original.owner.user.email}</span>
  },
  {
    accessorKey: "packageName",
    header: "Package Name",
    cell: ({row}) => <span>{row.original.pack.label}</span>
  },
  {
    accessorKey: "gateway",
    header: "Gateway",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({row}) => {
  //     if (row.original.paymentStatus === "Paid") {
  //         return <p className="text-green-600 bg-green-100 px-4 py-2 rounded-lg">Paid</p> 
  //     }
  //     else if (row.original.paymentStatus === "Pending") {
  //         return <p className="text-amber-600 bg-amber-100 px-4 py-2 rounded-lg">Pending</p> 
  //     } else {
  //         return <p className="text-red-600 bg-red-100 px-4 py-2 rounded-lg">Canceled</p> 
  //     }
  //   }        
  // },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => 
      <>
        {
        row.original.status
        ? <p className="text-green-600 bg-green-100 px-4 py-2 rounded-lg">Active</p> 
        : <p className="text-red-600 bg-red-100 px-4 py-2 rounded-lg">Inactive</p> 
        }
      </>
  }
]
