"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { RentProps } from "@/types"
import { format } from "date-fns"

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

export const columns: ColumnDef<RentProps>[] = [
  {
    accessorKey: "SL",
    header: "SL",
    cell: ({row}) => <span>{row.index + 1}</span>
  },
  {
    accessorKey: "invoiceNo",
    header: "Invoice No",
  },
  {
    accessorKey: "property_unit",
    header: "Property/Unit",
    cell: ({row}) => <span>{row.original.propertyName}/{row.original.unitName}</span>
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({row}) => <span>{format(row.original.dateOfPayment,"MMMM do, yyyy")}</span>
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  // {
  //   accessorKey: "tax",
  //   header: "Tax",
  // },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
]
