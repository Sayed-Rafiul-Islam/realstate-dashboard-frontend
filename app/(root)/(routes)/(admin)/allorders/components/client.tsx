"use client"

interface OrdersClientProps {
    data : OrderProps[]
}


import { useEffect, useState } from "react"


import { Toaster } from "react-hot-toast"
import { OrderProps } from "@/types"
import { columns } from "./column"
import { DataTable } from "@/components/ui/data-table"

export const OrdersClient : React.FC<OrdersClientProps> = ({data}) => {
    const filters = ['','Paid',"Pending","Canceled"]

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
            <DataTable pagination={true} filters={filters} searchKey="name" columns={columns} data={data} />
            <Toaster />
        </>
    )
}