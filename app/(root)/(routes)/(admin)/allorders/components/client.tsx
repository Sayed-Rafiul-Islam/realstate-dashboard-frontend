"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

interface OrdersClientProps {
    data : OrderProps[]
}

import { ColumnDef } from "@tanstack/react-table"
// import { CellAction } from "./cell-action"

import { useEffect, useState } from "react"
import Link from "next/link"

import toast, { Toaster } from "react-hot-toast"
import { OrderProps, PackageProps } from "@/types"
import { CellAction } from "./cell-action"
import { columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { OrdersDataTable } from "@/components/ui/orders-data-table"
import { Button } from "@/components/ui/button"
// import { SellRecords } from "@/components/ui/sellrecords-table"

export const OrdersClient : React.FC<OrdersClientProps> = ({data}) => {
    const filters = ['','Paid',"Pending","Canceled"]

    // ---------------------------------------------------------------------------------------------
    // anti hydration

    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if (!isMounted) {
        return null
    }
    return (
        <>
            <OrdersDataTable filters={filters} searchKey="name" columns={columns} data={data} />
            <Toaster />
        </>
    )
}