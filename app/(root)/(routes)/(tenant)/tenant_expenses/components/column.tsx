"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export interface ExpenseColumn {
  _id : string
  property_unit : string
  type : string
  description : string
  amount : string,
  status : boolean
}

export const columns: ColumnDef<ExpenseColumn>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "type",
    header: "Expense Type",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    cell: ({row}) => 
    <>
    {
      row.original.status ?
      <span className="bg-indigo-100 text-indigo-500 px-4 py-1 rounded-lg">Paid</span>
      :
      <span className="bg-amber-100 text-amber-500 px-4 py-1 rounded-lg">Due</span>
    }
    </>,
    header: "Status",
  },
  // {
  //   accessorKey: "property_unit",
  //   header: "Property/Unit",
  // },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
]
