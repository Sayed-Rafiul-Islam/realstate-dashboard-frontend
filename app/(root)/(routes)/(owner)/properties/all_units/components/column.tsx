"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export interface UnitColumn {
  _id : string,
  serial : number
  name : string,
  propertyName : string,
  tenant : string,
  rent : number,
  image : string
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
    accessorKey: "rent",
    header: "Rent",
    cell: ({row}) => <p className="">{row.original.rent} BDT</p> 
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
          <p className="font-bold">{row.original.tenant}</p> 
        }
      </>    
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },

]
