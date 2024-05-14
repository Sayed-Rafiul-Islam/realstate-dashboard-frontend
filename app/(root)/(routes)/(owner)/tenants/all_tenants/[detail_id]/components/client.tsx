"use client"

interface InvoicesClientProps {
    data : InvoiceColumn[]
}
import { InvoiceColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { useEffect, useState } from "react"

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
            <DataTable pagination={false} columns={columns} data={data} />
        </>
    )
}