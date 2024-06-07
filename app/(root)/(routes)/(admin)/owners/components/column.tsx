"use client"

import { ColumnDef } from "@tanstack/react-table"
import { UserProps } from "@/types"

export interface OwnerColumn {
  _id : string,
  SL : number,
  status : boolean
  user : UserProps

}

export const columns: ColumnDef<OwnerColumn>[] = [
  {
    accessorKey: "SL",
    header: "SL",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({row}) => {
      if (row.original.user.firstName !== "" && row.original.user.lastName !== '' ) {
          return <span>{row.original.user.firstName} {row.original.user.lastName}</span>
      }
      else if (row.original.user.firstName !== "" && row.original.user.lastName === '') {
          return <span>{row.original.user.firstName}</span>
      } 
      else if (row.original.user.firstName === "" && row.original.user.lastName !== '') {
        return <span>{row.original.user.lastName}</span>
      }
      else {
        return <span>N/A</span>
      }
    } 
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({row}) => <span>{row.original.user.email}</span>
  },
  {
    accessorKey: "contactNo",
    header: "Contact No",
    cell: ({row}) => <span>{row.original.user.contactNo}</span>
  },
  {
    header: "Status",
    cell: ({row}) => 
      <>
        {
        row.original.status
        ? <p className="text-green-600 bg-green-100 px-4 py-2 rounded-lg">Active</p> 
        : <p className="text-red-600 bg-red-100 px-4 py-2 rounded-lg">Inactive</p> 
        }
      </>
  }
]
