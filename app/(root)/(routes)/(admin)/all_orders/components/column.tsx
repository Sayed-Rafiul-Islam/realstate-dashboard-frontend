"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { OrderProps, OwnerProps, PackageProps } from "@/types"

export interface OrdersColumnProps {
  serial : number,
  _id : string,
  owner : OwnerProps,
  pack : PackageProps,
  label : string,
  monthly : boolean,
  amount : number,
  orderDate : string,
  dateOfPayment : string | undefined,
  gateway : string | undefined,
  status : string,
  transactionId : string | undefined
}

export const orderColumns: ColumnDef<OrdersColumnProps>[] = [
  {
    accessorKey: "serial",
    header: "SL",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({row}) => <span>{row.original.owner.user.firstName ? `${row.original.owner.user.firstName} ${row.original.owner.user.lastName}` : row.original.owner.user.lastName}</span>
  },
  {
    accessorKey: "label",
    header: "Package Name",
  },
  {
    header: "Type",
    cell: ({row}) => <span>{row.original.monthly ? "Monthly" : "Yearly"}</span>
  },
  {
    accessorKey: "amount",
    header: "Price",
    cell: ({row}) => <span>{row.original.amount} BDT</span>
  },
  {
    accessorKey: "status",
    header: "Payment Status",
    cell: ({row}) => {
      if (row.original.status === "Paid") {
          return <p className="text-indigo-600 bg-indigo-100 px-4 py-2 rounded-lg">Paid</p> 
      }
      else if (row.original.status === "Canceled") {
          return <p className="text-red-600 bg-red-100 px-4 py-2 rounded-lg">Canceled</p> 
      } else {
          return <p className="text-amber-600 bg-amber-100 px-3 py-2 rounded-lg">Pending</p> 
      }
    }        
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
]
