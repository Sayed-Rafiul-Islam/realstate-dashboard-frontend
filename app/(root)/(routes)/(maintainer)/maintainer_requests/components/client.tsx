"use client"

interface MaintainanceClientProps {
    data : MaintainanceRequestColumn[]
}

import { MaintainanceRequestColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { MaintainanceTypesReducerProps, OwnerMaintainanceTypesReducerProps, OwnerPropertyReducerProps, PropertiesReducerProps} from "@/types"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import './maintainance-requests.css'


export const MaintainanceClient : React.FC<MaintainanceClientProps> = ({data}) => { 

    const maintainanceTypes = useSelector(({ownerMaintainanceTypesReducer} : OwnerMaintainanceTypesReducerProps) => ownerMaintainanceTypesReducer).ownerMaintainanceTypes 
    const properties = useSelector(({ownerPropertyReducer} : OwnerPropertyReducerProps) => ownerPropertyReducer).ownerProperties 
    let propertySelect : {id : string, name : string}[] = [] 
    data.map((item)=>{
        const index = propertySelect.findIndex(({id}) => id === item.propertyId)
        if(index === -1) {
            propertySelect.push({id : item.propertyId, name : properties.filter(({_id})=>_id === item.propertyId)[0].name})
        }
    })


    const [requests, setRequests] = useState(data)
    const [type, setType] = useState('')
    const [property, setProperty] = useState('')


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
        
    },[type,data])

    const showAll = () => {
        setProperty('')
        setType('')
        setRequests(data)
    }




// ----------------------------------------------------------------------------------------------
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
                            setProperty('')
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
                                    Show All
                                </SelectItem>
                                {
                                    propertySelect.map(({id,name})=>
                                        <SelectItem key={id} value={id} >
                                            {name}
                                        </SelectItem>
                                    )
                                }
                                
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