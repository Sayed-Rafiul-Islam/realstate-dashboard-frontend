"use client"

interface PackageClientProps {
    data : PackageProps[]
}

import { Toaster } from "react-hot-toast"
import { PackageProps } from "@/types"
import { packagecolumns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { useEffect, useState } from "react"

export const PackagesClient : React.FC<PackageClientProps> = ({data}) => { 

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
            <DataTable pagination={true} searchKey="label" columns={packagecolumns} data={data} />
            <Toaster />
        </>
    )
}