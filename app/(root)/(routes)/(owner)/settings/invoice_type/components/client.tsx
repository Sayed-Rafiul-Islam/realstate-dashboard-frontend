"use client"

interface InvoiceTypesClientProps {
    data : InvoiceTypeColumn[]
}


import { useEffect, useState } from "react"



import { InvoiceTypeColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { useSelector } from 'react-redux'
import { PropertiesReducerProps, PropertyProps, UnitProps, UnitsReducerProps } from '@/types'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker-form'

export const InvoiceTypesClient : React.FC<InvoiceTypesClientProps> = ({data}) => {

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
            <DataTable pagination={true} searchKey="title" columns={columns} data={data} />
        </>
    )
}