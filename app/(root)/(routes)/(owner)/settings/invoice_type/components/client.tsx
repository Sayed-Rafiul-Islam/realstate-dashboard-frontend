"use client"

interface InvoiceTypesClientProps {
    data : InvoiceTypeColumn[]
}

import { useEffect, useState } from "react"
import { InvoiceTypeColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"

export const InvoiceTypesClient : React.FC<InvoiceTypesClientProps> = ({data}) => {

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
            <DataTable pagination={true} searchKey="title" columns={columns} data={data} />
        </>
    )
}