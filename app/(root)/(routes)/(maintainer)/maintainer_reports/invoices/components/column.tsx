"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { TenantProps } from "@/types"

export interface RentColumn {
  _id : string,
  invoiceNo : string,
  propertyId : string,
  unitId : string,
  property_unit : string,
  tenant : TenantProps,
  month_year : string,
  dueDate : string,
  description : string,
  status : string,
  amount : string,
  dateOfPayment ?: string,
  gateway ?: string,
  transactionId ?: string,
  payment ?: string
}

export const columns: ColumnDef<RentColumn>[] = [
  {
    accessorKey: "dueDate",
    header: "Date",
  },
  {
    accessorKey: "month_year",
    header: "Month/Year",
  },
  {
    accessorKey: "amount",
    header: "Amount",
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
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
]
