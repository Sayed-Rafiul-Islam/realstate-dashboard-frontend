"use client"

interface OccupancyClientProps {
    data : PropertyColumn[]
}

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'


import { useEffect, useState } from "react"



import { PropertyColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { useSelector } from 'react-redux'
import { PropertiesReducerProps, PropertyProps} from '@/types'
import { Button } from '@/components/ui/button'

import '../occupancy.css'
import { DatePicker } from '@/components/ui/date-picker'

export const EarningsClient : React.FC<OccupancyClientProps> = ({data}) => {

    const [properties, setProperties] = useState(data)
    const [property, setProperty] = useState('')


    useEffect(()=>{
        if (property === '') {
            setProperties(data)
        } else {
            const temp = data.filter((item) => item._id === property) 
            setProperties(temp)
        }
        
    },[property,data])

    const showAll = () => {
        setProperty('')
        setProperties(data)
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
                                {data.map(({_id, name} : PropertyProps,index)=>(
                                    <div >
                                        <SelectItem key={index} value={_id} >
                                            {name}
                                        </SelectItem>
                                    </div>
                                ))}
                            </SelectContent>
                    </Select>
                </div>
                <Button className='bg-purple-600' onClick={showAll}>Show All</Button>
            </div>  
            <DataTable pagination={true} searchKey="name" columns={columns} data={properties} />

        </>
    )
}