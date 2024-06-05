"use client"

interface NotificationsClientProps {
    data : NotificationsColumn[]
}

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'


import { useEffect, useState } from "react"



import { NotificationsColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { useSelector } from 'react-redux'
import { PropertiesReducerProps, PropertyProps, UnitProps, UnitsReducerProps } from '@/types'
import { Button } from '@/components/ui/button'

import '../notifications.css'
import { DatePicker } from '@/components/ui/date-picker'
import { Input } from '@/components/ui/input'

export const NotificationsClient : React.FC<NotificationsClientProps> = ({data}) => {

    
    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)

    const [notifications, setNotifications] = useState(data)
    const [issue, setIssue] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [datefilters, setDateFilters] = useState(false)

   


    useEffect(()=>{
         setDateFilters(false)
      
        if (issue === '') {
            if( fromDate === '' && toDate === '') {
                setNotifications(data)
            } 
            else if (fromDate !== '' && toDate !== '') {
                const temp = data.filter((item) => fromDate <= item.date && toDate >= item.date) 
                setNotifications(temp)
            } else {
                setNotifications(data)
            }
        } 
        else {
            if( fromDate === '' && toDate === '') {
                const temp = data.filter((item) => item.issue === issue) 
                setNotifications(temp)
                
            } else if (fromDate !== '' && toDate !== '') {
                const temp = data.filter((item) => item.issue === issue && fromDate <= item.date && toDate >= item.date)
                setNotifications(temp)
            } 
            
            else { 
                const temp = data.filter((item) => item.issue === issue) 
                setNotifications(temp)
            }
        }
        
    },[issue,data,fromDate,toDate])



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
                                    setIssue('')
                                } else {
                                    
                                    setIssue(e)
                                }                            
                            }}
                            value={issue}                              
                        >
                        <SelectTrigger className="select-filters">
                            <SelectValue 
                                placeholder="Filter by Issue"
                            />
                        </SelectTrigger>
                            <SelectContent  >
                                    <SelectItem value='all' >
                                        Clear Filters
                                    </SelectItem>
                                    <SelectItem value='New Invoice' >
                                        New Invoice
                                    </SelectItem>
                                    <SelectItem value='Maintainance Issue' >
                                        Maintainance Issue
                                    </SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="select-filters flex">          
                        <DatePicker clearDate={datefilters} label='From' onPickDate={(date)=> setFromDate(date)} />
                    </div>
                    <div className="select-filters flex">          
                        <DatePicker clearDate={datefilters} label='To' onPickDate={(date)=> setToDate(date)} />
                    </div>
                </div>
            </div>  
            <DataTable search={search} pagination={true} searchKey="body" columns={columns} data={notifications} />

        </>
    )
}