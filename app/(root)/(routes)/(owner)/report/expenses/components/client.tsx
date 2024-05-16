"use client"

interface ExpensesClientProps {
    data : ExpenseColumn[]
}

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'


import { useEffect, useState } from "react"



import { ExpenseColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { useSelector } from 'react-redux'
import { PropertiesReducerProps, PropertyProps, UnitProps, UnitsReducerProps } from '@/types'
import { Button } from '@/components/ui/button'

import '../expenses.css'
import { DatePicker } from '@/components/ui/date-picker'

export const ExpensesClient : React.FC<ExpensesClientProps> = ({data}) => {

    
    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)

    const [expenses, setExpenses] = useState(data)
    const [thisUnits, setThisUnits] = useState<UnitProps[]>([])
    const [property, setProperty] = useState('')
    const [unit, setUnit] = useState('')


    useEffect(()=>{
        if (property === '') {
            setExpenses(data)
        } else {
            const tempUnits = units.filter((item) => property === item.propertyId )
            setThisUnits(tempUnits)
            if (unit === '') {
                const temp = data.filter((item) => item.propertyId === property) 
                setExpenses(temp)
            } else {
                const temp = data.filter((item) => item.propertyId === property && item.unitId === unit) 
                setExpenses(temp)
            }
            
        }
        
    },[property,unit,data])

    const showAll = () => {
        setProperty('')
        setUnit('')
        setThisUnits([])
        setExpenses(data)
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
            <div className="select-filters-wrapper mb-5">
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
                    onValueChange={e=> setUnit(e)}
                    value={unit}                              
                >
                    <SelectTrigger className="select-filters">
                        <SelectValue 
                            placeholder="Select Unit"
                        />
                    </SelectTrigger>
                        <SelectContent  >
                            { thisUnits &&
                            thisUnits.map(({_id, name} : UnitProps,index)=>(
                                <div >
                                    <SelectItem key={index} value={_id} >
                                        {name}
                                    </SelectItem>
                                </div>
                            ))}
                        </SelectContent>
                </Select>
                   
                </div>
                <Button onClick={showAll}>Show All</Button>
            </div>  
            <DataTable total={data[0].total} pagination={true} searchKey="invoiceNo" columns={columns} data={expenses} />

        </>
    )
}