"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { PackageProps } from "@/types"

export const columns: ColumnDef<PackageProps>[] = [
    {
      accessorKey: "label",
      header: "Name",
    },
    {
      accessorKey: "monthlyPrice",
      header: "Monthly Price",
    },
    {
      accessorKey: "yearlyPrice",
      header: "Yearly Price",
    },
    {
      accessorKey: "maxProperty",
      header: "Max Property",
    },
    {
      accessorKey: "maxUnit",
      header: "Max Unit",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({row}) => 
        <>
          {
          row.original.status
          ? <p className="text-green-600 bg-green-200 px-4 py-2 rounded-lg">Active</p> 
          : <p className="text-red-600 bg-red-200 px-4 py-2 rounded-lg">Inactive</p> 
          }
        </>
    },
    {
      accessorKey: "trial",
      header: "Trial",
      cell: ({row}) => 
        <>
          {
          row.original.status
          ? <p className="text-indigo-600 bg-indigo-200 px-4 py-2 rounded-lg">Active</p> 
          : <p className="text-red-600 bg-red-200 px-4 py-2 rounded-lg">Inactive</p> 
          }
        </>
    },
    {
      id: "actions",
      cell: ({row}) => <CellAction data={row.original} />,
    },
  ]
