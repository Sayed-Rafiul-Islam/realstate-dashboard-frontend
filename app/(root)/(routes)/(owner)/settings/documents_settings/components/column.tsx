"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { DocumentSettingsProps } from "@/types"


export const columns: ColumnDef<DocumentSettingsProps>[] = [
  {
    header: "SL",
    cell: ({row}) => <span>{row.index + 1}</span>
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "details",
    header: "Details",
    cell: ({row}) => <div className="w-fit mx-auto">
      <p className="text-ellipsis overflow-hidden whitespace-nowrap w-[100px]">{row.original.details}</p>
    </div>
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) =>
    <>
      {
      row.original.status ?
      <span className="bg-indigo-100 px-4 py-2 rounded-md text-indigo-500">Active</span>
      :
      <span className="bg-red-100 px-4 py-2 rounded-md text-red-500">Inactive</span>
    }
    </>
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
]
