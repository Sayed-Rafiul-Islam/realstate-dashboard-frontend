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
import { MaintainanceTypesReducerProps, PropertiesReducerProps, PropertyProps, UnitProps, UnitsReducerProps } from '@/types'
import { Button } from '@/components/ui/button'

import '../expenses.css'
import { DatePicker } from '@/components/ui/date-picker'

export const ExpensesClient : React.FC<ExpensesClientProps> = ({data}) => {

    
    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    const {maintainanceTypes} = useSelector(({maintainanceTypesReducer} : MaintainanceTypesReducerProps) => maintainanceTypesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)

    const [expenses, setExpenses] = useState(data)
    const [thisUnits, setThisUnits] = useState<UnitProps[]>([])
    const [property, setProperty] = useState('')
    const [unit, setUnit] = useState('')
    const [type, setType] = useState('')


    useEffect(()=>{
        if (property === '' && type === '') {
            setExpenses(data)
        } else if (property !== '' && type === '') {
            const tempUnits = units.filter((item) => property === item.propertyId )
            setThisUnits(tempUnits)
            if (unit === '') {
                const temp = data.filter((item) => item.propertyId === property) 
                setExpenses(temp)
            } else {
                const temp = data.filter((item) => item.propertyId === property && item.unitId === unit) 
                setExpenses(temp)
            }
        } else if (property === '' && type !== '') {
            const temp = data.filter((item) => item.typeId === type) 
            setExpenses(temp)
        }
        
        else {
            const tempUnits = units.filter((item) => property === item.propertyId )
            setThisUnits(tempUnits)
            if (unit === '') {
                const temp = data.filter((item) => item.propertyId === property && item.typeId === type) 
                setExpenses(temp)
            } else {
                const temp = data.filter((item) => item.propertyId === property && item.unitId === unit && item.typeId === type) 
                setExpenses(temp)
            }
            
        }
        
    },[property,unit,data,type])

    const showAll = () => {
        setProperty('')
        setUnit('')
        setThisUnits([])
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
                                {maintainanceTypes.map(({type,_id})=>(
                                    <SelectItem key={_id} value={_id} >
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                </Select>
                   
                </div>
            </div>  
            <DataTable total={data[0].total} pagination={true} searchKey="invoiceNo" columns={columns} data={expenses} />

        </>
    )
}