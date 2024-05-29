"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export interface MaintainanceTypeColumn {
  SL : number,
  _id : string,
  type : string,
  maintainer : string,
  date : string
}

export const columns: ColumnDef<MaintainanceTypeColumn>[] = [
  {
    accessorKey: "SL",
    header: "SL",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "type",
    header: "Maintainance Type",
  },
  {
    accessorKey: "maintainer",
    header: "Maintainer Type",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
]
