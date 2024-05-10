"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { OrderProps, TenantProps } from "@/types"

export interface InvoiceColumn {
  _id : string,
  invoiceNo : string,
  prefix : string,
  Property_Unit : string,
  tenant : TenantProps,
  month : string,
  dueDate : string,
  type : string,
  description : string,
  status : string,
  amount : string,
  dateOfPayment ?: string,
  gateway ?: string,
  transactionId ?: string,
  payment ?: string
}

export const columns: ColumnDef<InvoiceColumn>[] = [
  {
    accessorKey: "invoiceNo",
    header: "Invoice No",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "packageName",
    header: "Package",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "gateway",
    header: "Gateway",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => {
      if (row.original.status === "Paid") {
          return <p className="text-green-600 bg-green-200 px-4 py-2 rounded-lg">Paid</p> 
      }
      else if (row.original.status === "Pending") {
          return <p className="text-amber-600 bg-amber-200 px-4 py-2 rounded-lg">Pending</p> 
      } else {
          return <p className="text-red-600 bg-red-200 px-4 py-2 rounded-lg">Canceled</p> 
      }
    }        
  },
]
