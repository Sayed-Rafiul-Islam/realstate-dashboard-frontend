"use client"

interface ExpensesClientProps {
    data : ExpenseProps[]
}


import { useEffect, useState } from "react"


import { Toaster } from "react-hot-toast"
import { columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { ExpenseProps } from "@/types"

export const ExpensesClient : React.FC<ExpensesClientProps> = ({data}) => {

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
            <DataTable pagination={true} searchKey="typeName" columns={columns} data={data} />
        </>
    )
}