"use client"

interface RentsClientProps {
    data : RentColumn[]
}

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'


import { useEffect, useState } from "react"



import { RentColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { useSelector } from 'react-redux'
import { PropertiesReducerProps, PropertyProps, UnitProps, UnitsReducerProps } from '@/types'
import { Button } from '@/components/ui/button'

import '../rents.css'

export const RentsClient : React.FC<RentsClientProps> = ({data}) => {

    
    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)

    const [rents, setRents] = useState(data)
    const [thisUnits, setThisUnits] = useState<UnitProps[]>([])
    const [property, setProperty] = useState('')
    const [unit, setUnit] = useState('')


    useEffect(()=>{
        if (property === '') {
            setRents(data)
        } else {
            const tempUnits = units.filter((item) => property === item.propertyId )
            setThisUnits(tempUnits)
            if (unit === '') {
                const temp = data.filter((item) => item.propertyId === property) 
                setRents(temp)
            } else {
                const temp = data.filter((item) => item.propertyId === property && item.unitId === unit) 
                setRents(temp)
            }
            
        }
        
    },[property,unit,data])

    const showAll = () => {
        setProperty('')
        setUnit('')
        setThisUnits([])
        setRents(data)
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
                </div>
            </div>  
            <DataTable pagination={true} searchKey="invoiceNo" columns={columns} data={rents} />
        </>
    )
}