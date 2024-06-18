"use client"

import { ColumnDef } from "@tanstack/react-table"

export interface MonthlyRecordColumn {
  SL : number,
  month_year : string,
  income : number,
  expense : number,
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
    cell: ({row}) => <span>{row.original.income} BDT</span>
  },
  {
    accessorKey: "expense",
    header: "Expense",
    cell: ({row}) => <span>{row.original.expense} BDT</span>
  },
  {
    accessorKey: "net",
    header: "Profit/Loss",
    cell : ({row}) => 
      <>
        {
          row.original.income > row.original.expense ?
          <p>{row.original.income - row.original.expense} BDT</p>
          :
          <p className="text-red-500">{row.original.expense - row.original.income} BDT</p>
        }
      </>
  }
]
