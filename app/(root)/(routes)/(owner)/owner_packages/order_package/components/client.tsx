"use client"

interface OrderPackageClientProps {
    data : PackageProps[]
}


import { useEffect, useState } from "react"


import { Toaster } from "react-hot-toast"
import { columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { InvoiceProps, PackageProps } from "@/types"

export const OrderPackageClient : React.FC<OrderPackageClientProps> = ({data}) => {

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