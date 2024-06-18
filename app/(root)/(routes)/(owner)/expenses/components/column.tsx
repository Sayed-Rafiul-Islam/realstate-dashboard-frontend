"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { ExpenseProps } from "@/types"


export const columns: ColumnDef<ExpenseProps>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({row}) => <span>{row.original.name}</span>
  },
  {
    accessorKey: "property_unit",
    header: "Property/Unit",
    cell: ({row}) => <span>{row.original.propertyName}/{row.original.unitName}</span>
  },
  {
    accessorKey: "typeName",
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
