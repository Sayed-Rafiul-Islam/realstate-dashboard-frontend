"use client"

import { InvoiceProps } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"


  export const columns: ColumnDef<InvoiceProps>[] = [
    {
      accessorKey: "dueDate",
      header: "Due Date",
      cell: ({row}) => <span>{row.original.dueDate ? format(row.original.dueDate,"MMMM do, yyyy") : 'N/A'}</span>
    },
    {
      accessorKey: "invoiceNo",
      header: "Invoice No",
    },
    {
      accessorKey: "typeName",
      header: "Invoice Type",
    },
    {
      accessorKey: "property_unit",
      header: "Property/Unit",
      cell: ({row}) => <span>{row.original.propertyName}/{row.original.unitName}</span>
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({row}) => <span>{row.original.amount} BDT</span>
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({row}) => {
        if (row.original.status === "Paid") {
            return <p className="text-green-600 bg-green-100 px-4 py-2 rounded-lg">Paid</p> 
        }
        else if (row.original.status === "Pending") {
            return <p className="text-amber-600 bg-amber-100 px-4 py-2 rounded-lg">Pending</p> 
        } else {
            return <p className="text-red-600 bg-red-100 px-4 py-2 rounded-lg">Due</p> 
        }
      }        
    }
  ]
