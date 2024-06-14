"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export interface MaintainanceRequestColumn {
  _id : string,
  propertyId : string,
  unitId : string,
  typeId : string,
  date : string,
  requestNo : string,
  type : string,
  issue : string,
  status : string,
  details : string,
  cost : number,
  attachment : string,
  property_unit : string,
  paymentStatus : string
}



  export const columns: ColumnDef<MaintainanceRequestColumn>[] = [
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "type",
      header: "Maintainance Type",
    },
    {
      accessorKey: "responsibility",
      header: "Responsibility",
    },
    {
      cell: ({row}) => <span>{row.original.cost} BDT</span>,
      header: "Amount",
    },
    {
      header: "Status",
      cell: ({row}) => {
        if (row.original.paymentStatus === "Paid") {
            return <p className="text-indigo-600 bg-indigo-100 px-4 py-2 rounded-lg">Paid</p> 
        }
        else if (row.original.paymentStatus === "Due") {
            return <p className="text-red-600 bg-red-100 px-4 py-2 rounded-lg">Due</p> 
        } else {
            return <p className="text-amber-600 bg-amber-100 px-3 py-2 rounded-lg">Pending</p> 
        }
      }        
    },
    {
      id: "actions",
      cell: ({row}) => <CellAction data={row.original} />,
    }
  ]
