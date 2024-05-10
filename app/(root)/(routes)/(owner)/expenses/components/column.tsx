"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export interface ExpenseColumn {
  _id : string
  name : string
  property_unit : string
  type : string
  description : string
  amount : string
}

export const columns: ColumnDef<ExpenseColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "property_unit",
    header: "Property/Unit",
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
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
]
