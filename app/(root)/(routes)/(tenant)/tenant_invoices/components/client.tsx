"use client"

interface InvoicesClientProps {
    data : InvoiceProps[]
}


import { useEffect, useState } from "react"
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import { columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { InvoiceProps, InvoiceTypesReducerProps, OwnerInvoiceTypesReducerProps } from "@/types"
import { useSelector } from "react-redux"
import '../invoices.css'

export const InvoicesClient : React.FC<InvoicesClientProps> = ({data}) => {

    const [invoices, setInvoices] = useState(data)
    const invoiceTypes = useSelector(({ownerInvoiceTypesReducer} : OwnerInvoiceTypesReducerProps) => ownerInvoiceTypesReducer).ownerInvoiceTypes 


    const [type, setType] = useState('')
    const [status, setStatus] = useState('')

    useEffect(()=>{
        if (type === '' && status === '') {
            setInvoices(data)
        } else {
            if (type !== '' && status === '') {
                const temp = data.filter((item) => item.type._id === type) 
                setInvoices(temp)
            } 
            else if ( status !== '' && type === '') {
                const temp = data.filter((item) => item.status === status) 
                setInvoices(temp)
            }
            else {
                const temp = data.filter((item) => item.status === status && item.type._id === type) 
                setInvoices(temp)
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
            <div className="select-filters-wrapper mb-4">
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
                                    <SelectItem value='Pending' >
                                        Pending
                                    </SelectItem>
                                    <SelectItem value='Due' >
                                        Due
                                    </SelectItem>
                        </SelectContent>
                    </Select>

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
                                    Clear Filter
                                </SelectItem>
                                {invoiceTypes.map(({title,_id})=>(
                                    <SelectItem key={_id} value={_id} >
                                        {title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                    </Select>
                </div>
            </div> 
            <DataTable pagination={true} searchKey="invoiceNo" columns={columns} data={invoices} />
        </>
    )
}