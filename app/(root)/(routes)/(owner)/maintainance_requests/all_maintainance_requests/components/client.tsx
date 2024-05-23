"use client"

interface MaintainanceClientProps {
    data : MaintainanceRequestColumn[]
}

import { MaintainanceRequestColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { PropertiesReducerProps, PropertyProps, UnitProps, UnitsReducerProps } from "@/types"
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

    const [requests, setRequests] = useState(data)
    const [types, setTypes] = useState<string[]>([''])

    const [property, setProperty] = useState('')
    const [type, setType] = useState('')

    useEffect(()=>{
        data.map((item)=> {
            const index = types.findIndex(i => i === item.type)
            if (index === -1) {
                types.push(item.type)
            }
        })
        setTypes(types.slice(1))
    },[])

    


    useEffect(()=>{
        if (type === '' && property === '') {
            setRequests(data)
        } else {
            if (type !== '' && property === '') {
                const temp = data.filter((item) => item.type === type) 
                setRequests(temp)
            } 
            else if ( property !== '' && type === '') {
                const temp = data.filter((item) => item.propertyId === property) 
                setRequests(temp)
            }
            else {
                const temp = data.filter((item) => item.propertyId === property && item.type === type) 
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

                    <Select
                        onValueChange={e=> setType(e)}
                        value={type}                              
                    >
                        <SelectTrigger className="select-filters">
                            <SelectValue 
                                placeholder="Select Type"
                            />
                        </SelectTrigger>
                            <SelectContent  >
                                {types.map((type,index)=>(
                                    <div >
                                        <SelectItem key={index} value={type} >
                                            {type}
                                        </SelectItem>
                                    </div>
                                ))}
                            </SelectContent>
                    </Select>
                    </div>
                    <Button className="bg-purple-600" onClick={showAll}>Show All</Button>
                </div>  
            <DataTable pagination={true} searchKey="requestNo" columns={columns} data={requests} />
        </>
    )
}