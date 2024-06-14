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

    const [requests, setRequests] = useState(data)
    const [responsibility, setResponsibility] = useState('')
    const [status, setStatus] = useState('')


    useEffect(()=>{
        if (responsibility === '' && status === '') {
            setRequests(data)
        } else {
            if (responsibility !== '' && status === '') {
                // const temp = data.filter((item) => item.responsibility === responsibility) 
                // setRequests(temp)
            } 
            else if ( status !== '' && responsibility === '') {
                const temp = data.filter((item) => item.paymentStatus === status) 
                setRequests(temp)
            }
            else {
                // const temp = data.filter((item) => item.paymentStatus === status && item.responsibility === responsibility) 
                // setRequests(temp)
            }
        }
        
    },[status,responsibility,data])


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
                                <SelectItem value='Paid' >
                                    Paid
                                </SelectItem>
                                <SelectItem value='Due' >
                                    Due
                                </SelectItem>
                                <SelectItem value='Pending' >
                                    Pending
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
                    </div>
            </div>  
            <DataTable pagination={true} searchKey="requestNo" columns={columns} data={requests} />
        </>
    )
}