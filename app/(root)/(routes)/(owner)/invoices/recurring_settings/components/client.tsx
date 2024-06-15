"use client"

interface RecurringInvoicesClientProps {
    data : InvoiceProps[]
}


import { useEffect, useState } from "react"


import { Toaster } from "react-hot-toast"
import {  columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { InvoiceProps } from "@/types"

export const RecurringInvoicesClient : React.FC<RecurringInvoicesClientProps> = ({data}) => {

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
            <DataTable pagination={true} searchKey="invoiceNo" columns={columns} data={data} />
        </>
    )
}