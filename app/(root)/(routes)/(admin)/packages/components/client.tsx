"use client"

interface PackageClientProps {
    data : PackageProps[]
}

import { Toaster } from "react-hot-toast"
import { PackageProps } from "@/types"
import { columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { useEffect, useState } from "react"

export const PackagesClinet : React.FC<PackageClientProps> = ({data}) => { 

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
            <Toaster />
        </>
    )
}