"use client"

interface DocumentClientProps {
    data : DocumentProps[]
}


import { useEffect, useState } from "react"
import { columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { DocumentProps } from "@/types"

export const DocumentsClient : React.FC<DocumentClientProps> = ({data}) => {

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
            <DataTable pagination={true} searchKey="tenantName" columns={columns} data={data} />
        </>
    )
}