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
         setDateFilters(false)
      
        if (property === '') {
            if( fromDate === '' && toDate === '') {
                setEarnings(data)
            } 
            else if (fromDate !== '' && toDate !== '') {
                const temp = data.filter((item) => fromDate <= item.isoDate && toDate >= item.isoDate) 
                setEarnings(temp)
            } else {
                setEarnings(data)
            }
        } 
        else {
            if( fromDate === '' && toDate === '') {
                const temp = data.filter((item) => item.propertyId === property) 
                setEarnings(temp)
                
            } else if (fromDate !== '' && toDate !== '') {
                const temp = data.filter((item) => item.propertyId === property && fromDate <= item.isoDate && toDate >= item.isoDate)
                setEarnings(temp)
            } 
            
            else { 
                const temp = data.filter((item) => item.propertyId === property) 
                setEarnings(temp)
            }
        }
        
    },[property,data,fromDate,toDate])

    const showAll = () => {
        setDateFilters(true)
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
                    <Select
                            onValueChange={e=> {
                                if (e === 'all') {
                                    showAll()
                                } else {
                                    
                                    setProperty(e)
                                }                            
                            }}
                            value={property}                              
                        >
                        <SelectTrigger className="select-filters">
                            <SelectValue 
                                placeholder="Select Property"
                            />
                        </SelectTrigger>
                            <SelectContent  >
                                    <SelectItem value='all' >
                                        Clear Filters
                                    </SelectItem>
                                {properties.map(({_id, name} : PropertyProps,index)=>(
                                    <SelectItem key={index} value={_id} >
                                        {name}
                                    </SelectItem>
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
                {/* <Button className='bg-purple-600' onClick={showAll}>Clear Filters</Button> */}
            </div>  
            <DataTable search={search} total={data[0].totalAmount} pagination={true} searchKey="invoiceNo" columns={columns} data={earnings} />

        </>
    )
}