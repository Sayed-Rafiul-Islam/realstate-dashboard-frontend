"use client"

interface TenantsClientProps {
    data : TenantColumn[]
}

import { TenantColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { OwnerPropertyReducerProps, OwnerUnitsReducerProps, PropertiesReducerProps, PropertyProps, UnitProps, UnitsReducerProps } from "@/types"
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

import './tenant-history.css'

export const TenantsClient : React.FC<TenantsClientProps> = ({data}) => { 

    
    const units = useSelector(({ownerUnitsReducer} : OwnerUnitsReducerProps) => ownerUnitsReducer).ownerUnits
    const properties = useSelector(({ownerPropertyReducer} : OwnerPropertyReducerProps) => ownerPropertyReducer).ownerProperties

    const [tenants, setTenants] = useState(data)
    const [thisUnits, setThisUnits] = useState<UnitProps[]>([])
    const [property, setProperty] = useState('')
    const [unit, setUnit] = useState('')


    useEffect(()=>{
        if (property === '') {
            setTenants(data)
        } else {
            const tempUnits = units.filter((item) => property === item.property._id )
            setThisUnits(tempUnits)
            if (unit === '') {
                const temp = data.filter((item) => item.property._id === property) 
                setTenants(temp)
            } else {
                const temp = data.filter((item) => item.property._id === property && item.unit._id === unit) 
                setTenants(temp)
            }
            
        }
        
    },[property,unit,data])

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
                <div className="select-filters-wrapper">
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
            <DataTable pagination={true} searchKey="name" columns={columns} data={tenants} />
        </>
    )
}