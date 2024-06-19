"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { InvoiceProps, PackageProps } from "@/types"
import { format } from "date-fns"

export const columns: ColumnDef<PackageProps>[] = [
  {
    accessorKey: "label",
    header: "Name",
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
    accessorKey: "maxMaintainer",
    header: "Max Maintainer",
  },
  {
    accessorKey: "maxInvoice",
    header: "Max Invoice",
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
    accessorKey: "trial",
    header: "Trial",
    cell: ({row}) => 
      <>
        {
        row.original.trial
        ? <p className="text-red-600 bg-red-200 px-4 py-2 rounded-lg">Yes</p> 
        : <p className="text-indigo-600 bg-indigo-200 px-4 py-2 rounded-lg">No</p> 
        }
      </>
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
]
