"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import Link from "next/link"
import { File } from "lucide-react"

export interface DocumentColumn {
  serial : number,
  _id : string,
  tenantId : string,
  propertyId : string,
  unitId : string,
  type : string,
  tenantName : string,
  property_unit : string,
  docFront : string,
  docBack : string,
  document : string,
  status : string
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
    cell: ({row}) => <Link className="hover:text-blue-500 transition-all flex items-center gap-2" target="_blank" href={row.original.document}><File size={15} />{row.original.type}.doc</Link>,
    header: "Document",
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
