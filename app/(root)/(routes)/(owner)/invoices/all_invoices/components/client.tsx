"use client"

interface InvoicesClientProps {
    data : InvoiceColumn[]
}


import { useEffect, useState } from "react"


import { Toaster } from "react-hot-toast"
import { InvoiceColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"

export const InvoicesClient : React.FC<InvoicesClientProps> = ({data}) => {

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
            <DataTable pagination={true} searchKey="name" columns={columns} data={data} />
            <Toaster />
        </>
    )
}