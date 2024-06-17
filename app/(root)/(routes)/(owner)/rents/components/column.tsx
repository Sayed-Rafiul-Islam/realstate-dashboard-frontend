"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { OwnerTenantsReducerProps, RentProps } from "@/types"
import { format } from "date-fns"
import { useSelector } from "react-redux"

export const columns: ColumnDef<RentProps>[] = [
  {
    accessorKey: "dateOfPayment",
    header: "Date",
    cell: ({row}) => <span>{format(row.original.dateOfPayment,"MMMM do, yyyy")}</span>
  },
  {
    accessorKey: "invoiceNo",
    header: "Invoice No",
  },
  {
    accessorKey: "property_unit",
    header: "Property/Unit",
    cell: ({row}) => <span>{row.original.propertyName}/{row.original.unitName}</span>
  },
  {
    header: "Tenant Name",
    cell: ({row}) => {
        if (row.original.property && row.original.unit) {
          const tenant = useSelector(({ownerTenantsReducer} : OwnerTenantsReducerProps) => ownerTenantsReducer).ownerTenants
          .filter((item) => item.property._id === row.original.property._id && item.unit._id === row.original.unit._id)[0]
          return <span>{tenant && tenant.name}</span>
        } else {
          <span></span>
        }
    }
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({row}) => {
  //     if (row.original.status === "Paid") {
  //         return <p className="text-green-600 bg-green-100 px-4 py-2 rounded-lg">Paid</p> 
  //     }
  //     else if (row.original.status === "Pending") {
  //         return <p className="text-amber-600 bg-amber-100 px-4 py-2 rounded-lg">Pending</p> 
  //     } else {
  //         return <p className="text-red-600 bg-red-100 px-4 py-2 rounded-lg">Due</p> 
  //     }
  //   }        
  // },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
]
