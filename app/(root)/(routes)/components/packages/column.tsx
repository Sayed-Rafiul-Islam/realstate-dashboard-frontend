"use client"

import { ColumnDef } from "@tanstack/react-table"
import { PackageProps } from "@/types"


  export const columns: ColumnDef<PackageProps>[] = [
    {
      accessorKey: "label",
      header: "Name",
    },
    {
      accessorKey: "monthlyPrice",
      header: "Monthly Price",
    },
    {
      accessorKey: "yearlyPrice",
      header: "Yearly Price",
    }
  ]
