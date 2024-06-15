"use client"

interface InvoicesClientProps {
    data : InvoiceProps[]
}
import { columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { InvoiceProps } from "@/types"
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