"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { MaintainanceRequestProps, MaintainanceTypeProps, MaintainerProps, OwnerProps, PropertyProps, UnitProps } from "@/types"
import { format } from "date-fns"

export interface MaintainanceRequestColumn {
  _id : string,
  propertyName : string,
  unitName : string,
  property_unit : string,
  property : PropertyProps,
  unit : UnitProps,
  date : string,
  requestNo : string,
  type : MaintainanceTypeProps,
  maintainer : MaintainerProps,
  issue : string,
  status : string,
  paymentStatus : string,
  details : string,
  cost : number,
  attachment : string,
  invoice : string,
  owner : OwnerProps
}



  export const columns: ColumnDef<MaintainanceRequestColumn>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({row}) => <span>{format(row.original.date,"MMMM do, yyyy")}</span>
    },
    {
      accessorKey: "requestNo",
      header: "Request No",
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({row}) => <span>{row.original.type && row.original.type.type}</span>
    },
    {
      accessorKey: "property_unit",
      header: "Property/Unit",
    },
    {
      accessorKey: "details",
      header: "Issue",
      // cell: ({row}) => <span>{row.original.type && row.original.type.type}</span>
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({row}) => {
        if (row.original.status === "Complete") {
            return <p className="text-indigo-600 bg-indigo-100 px-4 py-2 rounded-lg">Complete</p> 
        }
        else if (row.original.status === "Incomplete") {
            return <p className="text-red-600 bg-red-100 px-4 py-2 rounded-lg">Incomplete</p> 
        } else {
            return <p className="text-amber-600 bg-amber-100 px-3 py-2 rounded-lg">In Progress</p> 
        }
      }        
    },
    {
      id: "actions",
      cell: ({row}) => <CellAction data={row.original} />,
    }
  ]
