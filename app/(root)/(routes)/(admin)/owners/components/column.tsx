"use client"

import { ColumnDef } from "@tanstack/react-table"
import {  OwnerProps } from "@/types"

export const columns: ColumnDef<OwnerProps>[] = [
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
    accessorKey: "contactNo",
    header: "Contact No",
  },
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
