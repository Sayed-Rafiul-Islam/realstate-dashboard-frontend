"use client"

interface UnitsClientProps {
    data : UnitColumn[]
}


import { useEffect, useState } from "react"


import { Toaster } from "react-hot-toast"
import { UnitProps } from "@/types"
import { UnitColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"

export const UnitsClient : React.FC<UnitsClientProps> = ({data}) => {

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
            <Toaster />
        </>
    )
}