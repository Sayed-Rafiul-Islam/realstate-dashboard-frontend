"use client"

interface GatewayClientProps {
    data : GatewayColumn[]
}


import { useEffect, useState } from "react"



import { GatewayColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { useSelector } from 'react-redux'
import { PropertiesReducerProps, PropertyProps, UnitProps, UnitsReducerProps } from '@/types'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'

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