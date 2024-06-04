"use client"

interface MaintainanceClientProps {
    data : MaintainanceRequestColumn[]
}

import { MaintainanceRequestColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { MaintainanceTypesReducerProps} from "@/types"
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

    const {maintainanceTypes} = useSelector(({maintainanceTypesReducer} : MaintainanceTypesReducerProps) => maintainanceTypesReducer)   

    const [requests, setRequests] = useState(data)
    const [type, setType] = useState('')
    const [status, setStatus] = useState('')


    useEffect(()=>{
        if (type === '' && status === '') {
            setRequests(data)
        } else {
            if (type !== '' && status === '') {
                const temp = data.filter((item) => item.typeId === type) 
                setRequests(temp)
            } 
            else if ( status !== '' && type === '') {
                const temp = data.filter((item) => item.status === status) 
                setRequests(temp)
            }
            else {
                const temp = data.filter((item) => item.status === status && item.typeId === type) 
                setRequests(temp)
            }
        }
        
    },[status,type,data])

    const showAll = () => {
        setStatus('')
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
                                <SelectItem value='Complete' >
                                    Complete
                                </SelectItem>
                                <SelectItem value='Incomplete' >
                                    Incomplete
                                </SelectItem>
                                <SelectItem value='In Progress' >
                                    In Progress
                                </SelectItem>
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