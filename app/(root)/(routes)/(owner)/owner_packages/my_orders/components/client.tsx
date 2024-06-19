"use client"

interface MyOrdersClientProps {
    data : MyOrdersColumnProps[]
}


import { useEffect, useState } from "react"


import { Toaster } from "react-hot-toast"
import { MyOrdersColumnProps, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { InvoiceProps, OrderProps, PackageProps } from "@/types"

export const MyOrdersClient : React.FC<MyOrdersClientProps> = ({data}) => {

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
            <DataTable pagination={true} searchKey="label" columns={columns} data={data} />
        </>
    )
}