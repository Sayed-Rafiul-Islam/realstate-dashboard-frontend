"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { OwnerProps, PackageProps, PropertyProps, UnitProps, UserProps } from "@/types"
import Image from "next/image"

export interface TenantColumn {
  serial : number,
  _id : string,
  name : string,
  occupation : string,
  startDate : string,
  endDate : string,
  due : number,
  age : number,
  familyMembers : number,
  status : boolean,
  personalDoc : string,
  propertyDoc : string,
  property : PropertyProps,
  unit : UnitProps,
  owner : OwnerProps,
  user : UserProps
}


  export const columns: ColumnDef<TenantColumn>[] = [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({row}) => <div className="relative h-[50px] w-[50px] rounded-full mx-auto border-2 border-indigo-600">
          <Image className="rounded-full" fill alt="Picture" src={row.original.user.imageUrl} />
        </div>
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "contactNo",
      header: "Contact No",
      cell: ({row}) => <span>{row.original.user.contactNo}</span>
    },
    {
      accessorKey: "propertyName",
      header: "Property",
      cell: ({row}) => <span>{row.original.property.name}</span>
    },
    {
      accessorKey: "unitName",
      header: "Unit",
      cell: ({row}) => <span>{row.original.unit.name}</span>
    },
    {
      accessorKey: "rent",
      header: "Current Rent",
      cell: ({row}) => <span>{row.original.property.rent} BDT / {row.original.property.rentType}</span>
    },
    {
      accessorKey: "due",
      header: "Due",
      cell: ({row}) => 
        <>
          {
          row.original.due === 0
          ? <p>None</p> 
          : <p className="text-red-600">{row.original.due} BDT</p> 
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
          ? <p className="text-green-600 bg-green-100 px-4 py-2 rounded-lg">Active</p> 
          : <p className="text-red-600 bg-red-100 px-4 py-2 rounded-lg">Inactive</p> 
          }
        </>
    },
    {
      id: "actions",
      cell: ({row}) => <CellAction data={row.original} />,
    }
  ]
