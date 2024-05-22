"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export interface InvoiceTypeColumn {
  SL : number,
  _id : string,
  title : string,
  tax : string
}

export const columns: ColumnDef<InvoiceTypeColumn>[] = [
  {
    accessorKey: "SL",
    header: "SL",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "tax",
    header: "Tax",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
]
