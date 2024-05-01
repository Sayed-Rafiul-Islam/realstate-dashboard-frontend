"use client"

interface OrdersClientProps {
    data : OrderProps[]
}

import { Toaster } from "react-hot-toast"
import { OrderProps } from "@/types"
import { columns } from "./column"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { DataTable } from "@/components/ui/data-table"


export const ThreeOrdersClient : React.FC<OrdersClientProps> = ({data}) => {


    const orders : OrderProps[] = data.map((
        {
            _id,
            name,
            packageName,
            amount,
            gateway,
            date,
            status,
            transactionId
        } : OrderProps,index : number) => ({
            serial : index + 1,
            _id,
            name,
            packageName,
            amount,
            gateway,
            date : format(date,"MMMM do, yyyy"),
            status,
            transactionId
            
    }))

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
            <DataTable pagination={false} columns={columns} data={orders} />
            <Toaster />
        </>
    )
}