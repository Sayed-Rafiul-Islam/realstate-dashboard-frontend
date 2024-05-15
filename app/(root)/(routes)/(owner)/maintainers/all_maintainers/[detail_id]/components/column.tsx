"use client"

import { ColumnDef } from "@tanstack/react-table"

export interface InvoiceColumn {
  _id : string,
  date : string,
  invoiceNo : string,
  amount : string,
  category : string,
  status : boolean
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
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({row}) => 
        <>
          {
          row.original.status
          ? <p className="text-green-600 bg-green-100 px-4 py-2 rounded-lg">Paid</p> 
          : <p className="text-red-600 bg-red-100 px-4 py-2 rounded-lg">Due</p> 
          }
        </>
    },
  ]
