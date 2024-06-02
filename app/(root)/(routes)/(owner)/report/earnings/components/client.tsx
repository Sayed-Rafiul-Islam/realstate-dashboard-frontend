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
import { Input } from '@/components/ui/input'

export const EarningsClient : React.FC<EarningsClientProps> = ({data}) => {

    
    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)

    const [earnings, setEarnings] = useState(data)
    const [property, setProperty] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [datefilters, setDateFilters] = useState(false)

   


    useEffect(()=>{
      
        if (property === '') {
            if( fromDate === '' || toDate === '') {
                setEarnings(data)
            } else {
                setDateFilters(true)
                const temp = data.filter((item) => fromDate <= item.isoDate && toDate >= item.isoDate) 
                setEarnings(temp)
            }
        } 
        else {
            if( fromDate === '' || toDate === '') {
                const temp = data.filter((item) => item.propertyId === property) 
                setEarnings(temp)
            } else {
                
                setDateFilters(true)
                const temp = data.filter((item) => item.propertyId === property && fromDate <= item.isoDate && toDate >= item.isoDate) 
                setEarnings(temp)
            }
            // const temp = data.filter((item) => item.propertyId === property && fromDate <= item.isoDate && toDate >= item.isoDate) 
            // setEarnings(temp)
            // console.log(temp)
        }
        
    },[property,data,fromDate,toDate])

    const showAll = () => {
        setDateFilters(false)
        setProperty('')
        setFromDate('')
        setToDate('')
        setEarnings(data)
    }



    // ---------------------------------------------------------------------------------------------
    // anti hydration

    const [isMounted, setIsMounted] = useState(false)
    const [search, setSearch] = useState('')

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
                    {/* <Input 
                        value={search}
                        onChange={(e) =>setSearch(e.target.value)}
                    /> */}
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
                        <DatePicker clearDate={datefilters} label='From' onPickDate={(date)=> setFromDate(date)} />
                    </div>
                    <div className="select-filters flex">          
                        <DatePicker clearDate={datefilters} label='To' onPickDate={(date)=> setToDate(date)} />
                    </div>
                </div>
                <Button className='bg-purple-600' onClick={showAll}>Clear Filters</Button>
            </div>  
            <DataTable search={search} total={data[0].totalAmount} pagination={true} searchKey="invoiceNo" columns={columns} data={earnings} />

        </>
    )
}