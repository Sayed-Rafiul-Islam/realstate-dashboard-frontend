"use client"

interface ExpenseTypesClientProps {
    data : ExpenseTypeColumn[]
}


import { useEffect, useState } from "react"
import { ExpenseTypeColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"

export const ExpenseTypesClient : React.FC<ExpenseTypesClientProps> = ({data}) => {

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