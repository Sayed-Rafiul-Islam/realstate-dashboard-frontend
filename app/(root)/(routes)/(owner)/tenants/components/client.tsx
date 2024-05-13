"use client"

interface TenantsClientProps {
    data : TenantColumn[]
}

import { TenantColumn, columns } from "./column"
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

export const TenantsClient : React.FC<TenantsClientProps> = ({data}) => { 

    
    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)

    const [tenants, setTenants] = useState(data)
    const [thisUnits, setThisUnits] = useState<UnitProps[]>([])
    const [property, setProperty] = useState('')
    const [unit, setUnit] = useState('')


    useEffect(()=>{
        if (property === '') {
            setTenants(data)
        } else {
            const tempUnits = units.filter((item) => property === item.propertyId )
            setThisUnits(tempUnits)
            if (unit === '') {
                const temp = data.filter((item) => item.propertyId === property) 
                setTenants(temp)
            } else {
                const temp = data.filter((item) => item.propertyId === property && item.unitId === unit) 
                setTenants(temp)
            }
            
        }
        
    },[property,unit])

    const showAll = () => {
        setProperty('')
        setUnit('')
        setThisUnits([])
        setTenants(data)
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
                <div className="flex justify-end gap-2">
                    <Select
                        onValueChange={e=> setProperty(e)}
                        value={property}                              
                    >
                        <SelectTrigger className="w-1/5">
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
                        <SelectTrigger className="w-1/5">
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
                    <Button onClick={showAll}>Show All</Button>
                </div>  
            <DataTable pagination={true} searchKey="name" columns={columns} data={tenants} />
        </>
    )
}