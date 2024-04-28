"use client"

interface OrdersClientProps {
    data : OrderProps[]
}

import { Toaster } from "react-hot-toast"
import { OrderProps } from "@/types"
import { columns } from "./column"
import { format } from "date-fns"
import { ShortDataTable } from "@/components/ui/short-data-table"


export const ThreeOrdersClient : React.FC<OrdersClientProps> = ({data}) => {

    const orders : OrderProps[] = data.map((
        {
            _id,
            name,
            packageName,
            amount,
            gateway,
            date,
            status
        } : OrderProps,index : number) => ({
            serial : index + 1,
            _id,
            name,
            packageName,
            amount,
            gateway,
            date : format(date,"MMMM do, yyyy"),
            status
    }))

    return (
        <>
            <ShortDataTable columns={columns} data={orders} />
            <Toaster />
        </>
    )
}