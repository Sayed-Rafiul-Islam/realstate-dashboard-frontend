"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export interface DocumentColumn {
  serial : number,
  _id : string,
  type : string,
  tenantName : string,
  property_unit : string,
  docFront : string,
  docBack : string,
  status : string,
}

export const columns: ColumnDef<DocumentColumn>[] = [
  {
    accessorKey: "serial",
    header: "SL",
  },
  {
    accessorKey: "type",
    header: "Document Type",
  },
  {
    accessorKey: "property_unit",
    header: "Property/Unit",
  },
  {
    accessorKey: "tenantName",
    header: "Tenant Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => {
      if (row.original.status === "Accepted") {
          return <p className="text-green-600 bg-green-100 px-4 py-2 rounded-lg">Accepted</p> 
      }
      else if (row.original.status === "Declined") {
          return <p className="text-red-600 bg-red-100 px-4 py-2 rounded-lg">Declined</p> 
      } else {
          return <p className="text-amber-600 bg-amber-100 px-4 py-2 rounded-lg">In Progress</p> 
      }
    } 
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
]
