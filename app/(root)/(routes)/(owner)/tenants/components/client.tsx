"use client"

interface TenantsClientProps {
    data : TenantColumn[]
}

import { Toaster } from "react-hot-toast"
import { PackageProps } from "@/types"
import { TenantColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { useEffect, useState } from "react"

export const TenantsClient : React.FC<TenantsClientProps> = ({data}) => { 

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
        </>
    )
}