"use client"

interface ExpensesClientProps {
    data : ExpenseColumn[]
}


import { useEffect, useState } from "react"


import { Toaster } from "react-hot-toast"
import { ExpenseColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"

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
            <DataTable pagination={true} searchKey="name" columns={columns} data={data} />
            {/* <Toaster /> */}
        </>
    )
}