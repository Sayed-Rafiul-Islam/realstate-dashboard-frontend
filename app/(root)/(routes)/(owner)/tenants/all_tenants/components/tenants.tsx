"use client"
interface TenantsProps {
    data : TenantColumn[]
}

import './tenant-card.css'
import { TenantColumn } from "@/app/(root)/(routes)/(owner)/tenants/tenants_history/components/column";
import TenantCard from "./tenant-card";
import { useEffect, useState } from 'react';
import { OwnerPropertyReducerProps, OwnerUnitsReducerProps, PropertiesReducerProps, PropertyProps, UnitProps, UnitsReducerProps } from '@/types';
import { useSelector } from 'react-redux';

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import { Button } from '@/components/ui/button';

const Tenants : React.FC<TenantsProps> = ({data}) => {

    const [tenants, setTenants] = useState(data)

    const units = useSelector(({ownerUnitsReducer} : OwnerUnitsReducerProps) => ownerUnitsReducer).ownerUnits
    const properties = useSelector(({ownerPropertyReducer} : OwnerPropertyReducerProps) => ownerPropertyReducer).ownerProperties

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
                                        <SelectItem key={_id} value={_id} >
                                            {name}
                                        </SelectItem>
                                    </div>
                                ))}
                            </SelectContent>
                    </Select>
                </div>
            </div>  
                            
            <div className="cards">
                {
                    tenants.map((tenant) => 
                        <TenantCard key={tenant._id} data={tenant} />
                    )
                }
            </div>
        </>
     );
}
 
export default Tenants;