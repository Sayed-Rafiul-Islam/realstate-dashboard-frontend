"use client"

interface MonthlyRecordsClientProps {
    data : MonthlyRecordColumn[]
}

import { useEffect, useState } from "react"
import { MonthlyRecordColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import '../monthly.css'

export const MonthlyRecordsClient : React.FC<MonthlyRecordsClientProps> = ({data}) => {

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
            <DataTable pagination={true} searchKey="month_year" columns={columns} data={data} />
        </>
    )
}