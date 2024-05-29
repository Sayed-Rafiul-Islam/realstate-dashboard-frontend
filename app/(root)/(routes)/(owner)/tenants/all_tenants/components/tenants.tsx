"use client"
interface TenantsProps {
    data : TenantColumn[]
}

import './tenant-card.css'
import { TenantColumn } from "@/app/(root)/(routes)/(owner)/tenants/tenants_history/components/column";
import TenantCard from "./tenant-card";
import { useEffect, useState } from 'react';
import { PropertiesReducerProps, PropertyProps, UnitProps, UnitsReducerProps } from '@/types';
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

    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)
    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)

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
                                    <div key={_id}>
                                        <SelectItem  value={_id} >
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
                                        <SelectItem key={_id} value={_id} >
                                            {name}
                                        </SelectItem>
                                    </div>
                                ))}
                            </SelectContent>
                    </Select>
                </div>
                <Button className='bg-purple-600' onClick={showAll}>Show All</Button>
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