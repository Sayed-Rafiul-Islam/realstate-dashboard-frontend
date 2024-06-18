"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export interface PropertyColumn {
  SL : number,
  _id : string,
  name : string,
  description : string,
  address : string,
  coverImage : string,
  unitCount : number,
  deposit :number,
  lateFee :number,
  rent : number,
  rentType : string,
  city : string,
  state : string,
  country : string,
  postCode : string,
  tenantCount : number
}

export const columns: ColumnDef<PropertyColumn>[] = [
  {
    accessorKey: "SL",
    header: "SL",
  },
  {
    accessorKey: "name",
    header: "Property",
  },
  {
    accessorKey: "unitCount",
    header: "Total Unit",
  },
  {
    accessorKey: "tenantCount",
    header: "Total Tenants",
  },
  {
    accessorKey: "available",
    header: "Available Units",
    cell: ({row}) => <span>{row.original.unitCount - row.original.tenantCount}</span>
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
]
