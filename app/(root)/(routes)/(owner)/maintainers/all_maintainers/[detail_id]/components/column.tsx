"use client"

import { ColumnDef } from "@tanstack/react-table"

export interface InvoiceColumn {
  _id : string,
  date : string,
  invoiceNo : string,
  amount : string,
  type : string,
  status : string
}


  export const columns: ColumnDef<InvoiceColumn>[] = [
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "invoiceNo",
      header: "Invoice No",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "type",
      header: "Category",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({row}) => {
        if (row.original.status === "Paid") {
          return <p className="text-green-600 bg-green-100 px-4 py-2 rounded-lg">Paid</p> 
        } else if (row.original.status === "Due") {
          return <p className="text-red-600 bg-red-100 px-4 py-2 rounded-lg">Due</p>
        } else {
          return <p className="text-amber-500 bg-amber-100 px-4 py-2 rounded-lg">Pending</p>
        }
      }
    }
  ]
