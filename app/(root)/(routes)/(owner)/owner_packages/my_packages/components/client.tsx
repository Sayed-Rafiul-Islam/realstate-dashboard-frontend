"use client"

interface MyPackagesClientProps {
    data : OwnerPackageProps[]
}


import { useEffect, useState } from "react"


import { Toaster } from "react-hot-toast"
import { columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { InvoiceProps, OwnerPackageProps, PackageProps } from "@/types"

export const MyPackagesClient : React.FC<MyPackagesClientProps> = ({data}) => {

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