"use client"

interface MonthlyRecordsClientProps {
    data : MonthlyRecordColumn[]
}

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'


import { useEffect, useState } from "react"



import { MonthlyRecordColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { useSelector } from 'react-redux'
import { PropertiesReducerProps, PropertyProps} from '@/types'
import { Button } from '@/components/ui/button'

import '../monthly.css'
import { DatePicker } from '@/components/ui/date-picker'

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