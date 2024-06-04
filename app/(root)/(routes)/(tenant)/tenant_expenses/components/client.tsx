"use client"

interface ExpensesClientProps {
    data : ExpenseColumn[]
}


import { useEffect, useState } from "react"
import { ExpenseColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { useSelector } from "react-redux"
import { ExpenseTypesReducerProps } from "@/types"
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import '../tenant-expenses.css'

export const ExpensesClient : React.FC<ExpensesClientProps> = ({data}) => {

    const {expenseTypes} = useSelector(({expenseTypesReducer} : ExpenseTypesReducerProps) => expenseTypesReducer)
    const [type, setType] = useState('')
    const [expenses, setExpenses] = useState(data)


    useEffect(()=>{
        if (type === '') {
            setExpenses(data)
        } else {
            const temp = data.filter((item) => item.typeId === type) 
            setExpenses(temp)
        }
    },[data,type])

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
             <div className="select-filters-wrapper mb-5">
            <div>
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
                                        Show All Types
                                    </SelectItem>
                                    {expenseTypes.map(({title,_id})=>(
                                        <SelectItem key={_id} value={_id} >
                                            {title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                </Select>
            </div>
        </div>
        <DataTable pagination={true} searchKey="name" columns={columns} data={expenses} />
       </>
    )
}