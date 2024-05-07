"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { PackageProps } from "@/types"
import Image from "next/image"

export interface TenantColumn {
  serial : number,
  _id : string,
  propertyName : string,
  unitName : string,
  name : string,
  image : string,
  email : string,
  phone : string,
  occupation : string,
  startDate : string,
  NID : number,
  due : number,
  age : number,
  familyMember : number,
  status : boolean,
  monthlyRent : string | number
}


  export const columns: ColumnDef<TenantColumn>[] = [
    {
      accessorKey: "serial",
      header: "SL",
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({row}) => <div className="relative h-[50px] w-[50px] rounded-full mx-auto border-2 border-indigo-600"><Image className="rounded-full" fill alt="Picture" src={row.original.image} /></div>
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "phone",
      header: "Contact No",
    },
    {
      accessorKey: "due",
      header: "Due",
      cell: ({row}) => 
        <>
          {
          row.original.due === 0
          ? <p>None</p> 
          : <p className="text-red-600">$ {row.original.due}</p> 
          }
        </>
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({row}) => 
        <>
          {
          row.original.status
          ? <p className="text-green-600 bg-green-200 px-4 py-2 rounded-lg">Active</p> 
          : <p className="text-red-600 bg-red-200 px-4 py-2 rounded-lg">Inactive</p> 
          }
        </>
    },
    {
      id: "actions",
      cell: ({row}) => <CellAction data={row.original} />,
    }
  ]
