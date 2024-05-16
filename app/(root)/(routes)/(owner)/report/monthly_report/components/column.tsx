"use client"

import { ColumnDef } from "@tanstack/react-table"

export interface MonthlyRecordColumn {
  SL : number,
  _id : string,
  month_year : string,
  income : string,
  expense : string,
  net : number
}

export const columns: ColumnDef<MonthlyRecordColumn>[] = [
  {
    accessorKey: "SL",
    header: "SL",
  },
  {
    accessorKey: "month_year",
    header: "Month/Year",
  },
  {
    accessorKey: "income",
    header: "Income",
  },
  {
    accessorKey: "expense",
    header: "Expense",
  },
  {
    accessorKey: "net",
    header: "Profit/Loss",
    cell : ({row}) => 
      <>
        {
          row.original.net < 0 ?
          <p className="text-red-500">{row.original.net*-1} BDT</p>
          :
          <p>{row.original.net} BDT</p>

        }
      </>
  }
]
