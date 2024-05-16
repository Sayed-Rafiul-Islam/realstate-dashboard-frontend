"use client"

interface EarningsClientProps {
    data : EarningColumn[]
}

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'


import { useEffect, useState } from "react"



import { EarningColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { useSelector } from 'react-redux'
import { PropertiesReducerProps, PropertyProps, UnitProps, UnitsReducerProps } from '@/types'
import { Button } from '@/components/ui/button'

import '../earnings.css'
import { DatePicker } from '@/components/ui/date-picker'

export const EarningsClient : React.FC<EarningsClientProps> = ({data}) => {

    
    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)

    const [earnings, setEarnings] = useState(data)
    const [property, setProperty] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')


    useEffect(()=>{
        if (property === '' || fromDate === '' || toDate === '') {
            setEarnings(data)
        } else {
            const temp = data.filter((item) => item.propertyId === property && fromDate <= item.isoDate && toDate >= item.isoDate) 
            setEarnings(temp)
        }
        
    },[property,data,fromDate,toDate])

    const showAll = () => {
        setProperty('')
        setFromDate('')
        setToDate('')
        setEarnings(data)
    }

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
            <div className="select-filters-wrapper mb-5">
                <div>
                    <Select
                        onValueChange={e=> setProperty(e)}
                        value={property}                              
                    >
                        <SelectTrigger className="select-filters">
                            <SelectValue 
                                placeholder="Select Property"
                            />
                        </SelectTrigger>
                            <SelectContent  >
                                {properties.map(({_id, name} : PropertyProps,index)=>(
                                    <div >
                                        <SelectItem key={index} value={_id} >
                                            {name}
                                        </SelectItem>
                                    </div>
                                ))}
                            </SelectContent>
                    </Select>
                    <div className="select-filters flex">          
                        <DatePicker onPickDate={(date)=> setFromDate(date)} />
                    </div>
                    <div className="select-filters flex">          
                        <DatePicker onPickDate={(date)=> setToDate(date)} />
                    </div>
                </div>
                <Button onClick={showAll}>Show All</Button>
            </div>  
            <DataTable total={data[0].totalAmount} pagination={true} searchKey="invoiceNo" columns={columns} data={earnings} />

        </>
    )
}