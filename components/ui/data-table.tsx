"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel
} from "@tanstack/react-table"
import { useEffect, useState } from "react"


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  searchKey ?: string | undefined,
  filters ?: string[] | undefined,
  pagination : boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  filters,
  pagination
}: DataTableProps<TData, TValue>) {

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
      )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
        columnFilters
      },
  })
  const [active, setActive] = useState("")

  return (
    <div className="bg-gray-100 px-5 rounded-md">
        <div className="flex md:flex-row flex-col justify-between md:items-center py-5 gap-2">
                {
                    searchKey &&
                    <div className="flex items-center">
                        <Input
                            placeholder="Search"
                            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                            onChange={(event : any) =>
                                table.getColumn(searchKey)?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm"
                            />
                    </div>
                }
                {
                    filters &&
                    <div className="flex gap-2 flex-wrap">
                        {
                            filters.map((z,index) => 
                                <Button 
                                key={index}
                                    className={`${active === z && "bg-indigo-200 text-indigo-600 border border-indigo-600"}`} 
                                    value={z}
                                    onClick={(e : any)=> {
                                        table.getColumn("status")?.setFilterValue(e.target.value)
                                        setActive(z)

                                    }} 
                                    variant='outline'
                                >
                                    { z === '' ? "All" : z}
                                </Button>
                            )
                        }
                    </div>
                }
           </div>
        <div className="rounded-md border flex-wrap">
            <Table className="overflow-scroll">
                <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        return (
                        <TableHead key={header.id} className="px-6 text-center">
                            {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                        </TableHead>
                        )
                    })}
                    </TableRow>
                ))}
                </TableHeader>
                <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                    <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                    >
                        {row.getVisibleCells().map((cell) => (
                        <TableCell className="text-center" key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                        ))}
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                    </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </div>
        {
            pagination && 
            <div className="flex items-center justify-end space-x-2 py-4">
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                Previous
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                Next
            </Button>
        </div>
        }
    </div>
  )
}
