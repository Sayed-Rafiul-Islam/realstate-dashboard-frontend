"use client"

interface RentsClientProps {
    data : RentColumn[]
}

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'


import { useEffect, useState } from "react"



import { RentColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { useSelector } from 'react-redux'
import { PropertiesReducerProps, PropertyProps, UnitProps, UnitsReducerProps } from '@/types'

import '../rents.css'

export const RentsClient : React.FC<RentsClientProps> = ({data}) => {

    const [rents, setRents] = useState(data)
    const [status, setStatus] = useState('')


    useEffect(()=>{
        if (status === '') {
            setRents(data)
        } else {
            const temp = data.filter((item) => item.status === status) 
            setRents(temp) 
        }
        
    },[status,data])

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
            <div className="select-filters-wrapper mb-4">
                <div>
                    <Select
                        onValueChange={e=> {
                            if (e === 'all') {
                                setStatus('')
                            } else {
                                
                                setStatus(e)
                            }                            
                        }}
                        value={status}                              
                    >
                        <SelectTrigger className="select-filters">
                            <SelectValue 
                                placeholder="Select Status"
                            />
                        </SelectTrigger>
                            <SelectContent  >
                                    <SelectItem value='all' >
                                        Show All
                                    </SelectItem>
                                    <SelectItem value='Paid' >
                                        Paid
                                    </SelectItem>
                                    <SelectItem value='Pending' >
                                        Pending
                                    </SelectItem>
                                    <SelectItem value='Due' >
                                        Due
                                    </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>   
            <DataTable pagination={true} searchKey="month_year" columns={columns} data={rents} />
        </>
    )
}