"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { PropertyProps, TenantProps } from "@/types"

export interface UnitColumn {
  _id : string,
  serial : number
  name : string,
  propertyName : string,
  property: PropertyProps
  tenant : TenantProps | undefined,
  rent : number,
  image : string,
  description : string,
  condition : string,
  squareFeet : number,
  bedrooms : number,
  washrooms : number,
  kitchens : number
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
          row.original.tenant ?
          <p className="font-bold">{row.original.tenant.name}</p> 
          :
          <p className="text-red-600">Not Available</p> 
        }
      </>    
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },

]
