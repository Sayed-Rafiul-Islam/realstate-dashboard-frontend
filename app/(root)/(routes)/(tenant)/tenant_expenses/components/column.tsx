"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"

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
  {
    id: "action",
    cell: ({row}) => 
      <>
        {
          row.original.status ||
          <button 
            className="border border-green-500 text-green-500 px-4 py-1 rounded-lg hover:bg-green-500 hover:text-white transition-all"
          >
            Pay
          </button> 
        }
      </>,
  },
]
