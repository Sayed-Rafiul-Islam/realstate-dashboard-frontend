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


    const formattedOrders = data.map((
        {
            _id,
            owner,
            pack,
            monthly,
            status,
            orderDate,
            dateOfPayment,
            gateway,
            transactionId
        } ,index : number) => ({
            serial : index + 1,
            _id,
            owner,
            pack,
            label : pack.label,
            monthly,
            amount : monthly ? pack.monthlyPrice : pack.yearlyPrice,
            orderDate,
            dateOfPayment,
            gateway,
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
            <DataTable pagination={false} columns={columns} data={data} />
        </>
    )
}