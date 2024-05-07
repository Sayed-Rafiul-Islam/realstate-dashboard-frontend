"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export interface UnitColumn {
  _id : string,
  serial : number
  name : string,
  propertyName : string,
  tenant : string
}

export const columns: ColumnDef<UnitColumn>[] = [
  {
    accessorKey: "serial",
    header: "SL",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "propertyName",
    header: "Property Name",
  },
  {
    accessorKey: "tenant",
    header: "Tenant",
    cell: ({row}) => 
      <>
        {
          row.original.tenant === '' ?
          <p className="text-red-600">Not Available</p> 
          :
          <p className="text-green-600">{row.original.tenant}</p> 
        }
      </>    
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },

]
