"use client"

interface MaintainanceClientProps {
    data : MaintainanceRequestColumn[]
}

import { MaintainanceRequestColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { MaintainanceTypesReducerProps, PropertiesReducerProps, PropertyProps, UnitProps, UnitsReducerProps } from "@/types"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import { Button } from "@/components/ui/button"

import './tenant-history.css'

export const MaintainanceClient : React.FC<MaintainanceClientProps> = ({data}) => { 

    
    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    const {maintainanceTypes} = useSelector(({maintainanceTypesReducer} : MaintainanceTypesReducerProps) => maintainanceTypesReducer)


    const [requests, setRequests] = useState(data)

    const [property, setProperty] = useState('')
    const [type, setType] = useState('')


    useEffect(()=>{
        if (type === '' && property === '') {
            setRequests(data)
        } else {
            if (type !== '' && property === '') {
                const temp = data.filter((item) => item.typeId === type) 
                setRequests(temp)
            } 
            else if ( property !== '' && type === '') {
                const temp = data.filter((item) => item.propertyId === property) 
                setRequests(temp)
            }
            else {
                const temp = data.filter((item) => item.propertyId === property && item.typeId === type) 
                setRequests(temp)
            }
        }
        
    },[property,type,data])

    const showAll = () => {
        setProperty('')
        setType('')
        setRequests(data)
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
            <div className="select-filters-wrapper">
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
                                    For All Properties
                                </SelectItem>
                            {properties.map(({_id, name} : PropertyProps,index)=>(
                                <SelectItem key={index} value={_id} >
                                    {name}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>

                <Select
                    onValueChange={e=> {
                        if (e === 'all') {
                            showAll()
                        } else {
                            setType(e)
                        }
                    }}
                    value={type}                              
                >
                        <SelectTrigger className="select-filters">
                            <SelectValue 
                                placeholder="Select Type"
                            />
                        </SelectTrigger>
                            <SelectContent >
                                <SelectItem value='all' >
                                    Clear Filter
                                </SelectItem>
                                {maintainanceTypes.map(({type,_id})=>(
                                    <SelectItem key={_id} value={_id} >
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                    </Select>
                    </div>
                </div>  
            <DataTable pagination={true} searchKey="requestNo" columns={columns} data={requests} />
        </>
    )
}