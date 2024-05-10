"use client"

interface ExpensesClientProps {
    data : DocumentColumn[]
}


import { useEffect, useState } from "react"


import { Toaster } from "react-hot-toast"
import { DocumentColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"

export const DocumentsClient : React.FC<ExpensesClientProps> = ({data}) => {

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