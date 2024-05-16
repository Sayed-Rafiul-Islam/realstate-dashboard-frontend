"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export interface EarningColumn {
  SL : number,
  _id : string,
  invoiceNo : string,
  propertyId : string,
  unitId : string,
  date : string,
  amount : string,
  totalAmount : string,
  tax : string,
  property_unit : string,
  isoDate : string
}

export const columns: ColumnDef<EarningColumn>[] = [
  {
    accessorKey: "SL",
    header: "SL",
  },
  {
    accessorKey: "invoiceNo",
    header: "Invoice No",
  },
  {
    id : "propertyId",
    accessorKey: "property_unit",
    header: "Property/Unit",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
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
