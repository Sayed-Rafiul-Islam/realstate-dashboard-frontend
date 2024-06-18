"use client"

interface MaintainanceClientProps {
    data : MaintainanceRequestProps[]
}

import { columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { MaintainanceRequestProps, MaintainanceTypesReducerProps, OwnerMaintainanceTypesReducerProps} from "@/types"
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

    const [requests, setRequests] = useState(data)
    const [responsibility, setResponsibility] = useState('')
    const [type, setType] = useState('')
    const [status, setStatus] = useState('')

    console.log(data[0].type._id,type)


    useEffect(()=>{
        if (type === '' && status === '') {
            setRequests(data)
        } else {
            if (type !== '' && status === '') {
                const temp = data.filter((item) => item.type._id === type) 
                setRequests(temp)
            } 
            else if ( status !== '' && type === '') {
                const temp = data.filter((item) => item.status === status) 
                setRequests(temp)
            }
            else {
                const temp = data.filter((item) => item.status === status && item.type._id === type) 
                setRequests(temp)
            }
        }
        
    },[status,type,data])


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
                                    <SelectItem value='Incolplete' >
                                    Incolplete
                                    </SelectItem>
                                    <SelectItem value='In Progress' >
                                    In Progress
                                    </SelectItem>
                        </SelectContent>
                    </Select>

                    {/* <Select
                        onValueChange={e=> {
                            if (e === 'all') {
                                setResponsibility('')
                            } else {
                                setResponsibility(e)
                            }
                        }}
                        value={responsibility}                              
                    >
                            <SelectTrigger className="select-filters">
                                <SelectValue 
                                    placeholder="Select Responsibility"
                                />
                            </SelectTrigger>
                                <SelectContent >
                                    <SelectItem value='all' >
                                        For Both
                                    </SelectItem>
                                        <SelectItem value="Owner" >
                                            Owner
                                        </SelectItem>
                                        <SelectItem value="Tenant" >
                                            Tenant
                                        </SelectItem>
                                </SelectContent>
                    </Select> */}
                    <Select
                        onValueChange={e=> {
                            if (e === 'all') {
                                setType('')
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
                                        All Types
                                    </SelectItem>
                                    {
                                        maintainanceTypes.map(({_id,type})=>
                                        <SelectItem key={_id} value={_id} >
                                            {type}
                                        </SelectItem>
                                        )
                                    }
                                </SelectContent>
                    </Select>
                </div>
            </div>  
            <DataTable pagination={true} searchKey="requestNo" columns={columns} data={requests} />
        </>
    )
}