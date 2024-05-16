"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export interface PropertyColumn {
  SL : number,
  _id : string,
  name : string,
  description : string,
  location : string,
  coverImage : string,
  unitCount : number,
  rooms :number,
  available :number,
  tenants :number,
  deposit :number,
  lateFee :number,
  rent : number,
  rentType : string,
  city : string,
  state : string,
  country : string,
  postCode : string
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
    accessorKey: "tenants",
    header: "Total Tenants",
  },
  {
    accessorKey: "available",
    header: "Available Units",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
]
