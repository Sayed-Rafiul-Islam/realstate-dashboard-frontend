"use client"

interface GatewayClientProps {
    data : GatewayColumn[]
}


import { useEffect, useState } from "react"
import { GatewayColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"

export const GatewayClient : React.FC<GatewayClientProps> = ({data}) => {

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
            <DataTable pagination={true} searchKey="slug" columns={columns} data={data} />
        </>
    )
}