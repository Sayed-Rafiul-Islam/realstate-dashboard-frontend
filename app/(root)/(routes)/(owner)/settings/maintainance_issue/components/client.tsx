"use client"

interface MaintainanceIssueClient {
    data : MaintainanceTypeColumn[]
}

import { useEffect, useState } from "react"
import { MaintainanceTypeColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"

export const MaintainanceIssueClient : React.FC<MaintainanceIssueClient> = ({data}) => {

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
            <DataTable pagination={true} searchKey="type" columns={columns} data={data} />
        </>
    )
}