"use client"

import { ColumnDef } from "@tanstack/react-table"

export interface UnitColumn {
  serial : number
  name : string,
  description : string,
  condition : string,
  squareFeet : number,
  bedrooms: number ,
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
    accessorKey: "bedrooms",
    header: "Bedroom",
  },
  {
    accessorKey: "washrooms",
    header: "Washroom",
  },
  {
    accessorKey: "kitchens",
    header: "Kitchen",
  },
  {
    accessorKey: "squareFeet",
    header: "Square Feet",
  },
  {
    accessorKey: "condition",
    header: "Condition",
  }
]
