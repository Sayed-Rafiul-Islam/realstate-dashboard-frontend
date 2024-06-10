"use client"
interface MaintainersProps {
    data : MaintainerProps[]
}

import './maintainer-card.css'
import { useEffect, useState } from 'react';
import { MaintainanceTypesReducerProps, MaintainerProps, OwnerMaintainanceTypesReducerProps } from '@/types';

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import { Button } from '@/components/ui/button';
import MaintainerCard from './maintainer-card';
import { useSelector } from 'react-redux';

const Maintainers : React.FC<MaintainersProps> = ({data}) => {

    const [maintainers, setMaintainers] = useState(data)
    const maintainanceTypes = useSelector(({ownerMaintainanceTypesReducer} : OwnerMaintainanceTypesReducerProps) => ownerMaintainanceTypesReducer).ownerMaintainanceTypes

    const [type, setType] = useState('')
    const [status, setStatus] = useState('')


    useEffect(()=>{
        if (type === '' && status === '') {
            setMaintainers(data)
        } else {
            if (type !== '' && status === '') {
                const temp = data.filter((item) => item.type._id === type) 
                setMaintainers(temp)
            } 
            else if ( status !== '' && type === '') {
                const temp = data.filter((item) => item.status === status) 
                setMaintainers(temp)
            }
            else {
                const temp = data.filter((item) => item.status === status && item.type._id === type) 
                setMaintainers(temp)
            }
        }
        
    },[status,type,data])

    const showAll = () => {
        setType('')
        setStatus('')
        setMaintainers(data)
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
                                {maintainanceTypes.map(({maintainer,_id})=>(
                                    <SelectItem key={_id} value={_id} >
                                        {maintainer}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                    </Select>
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
                            <SelectContent >
                                <SelectItem value="all" >
                                    All
                                </SelectItem>
                                <SelectItem value="Available" >
                                    Available
                                </SelectItem>
                                <SelectItem value="Unavailable" >
                                    Unavailable
                                </SelectItem>
                                <SelectItem value="Pending" >
                                    Pending
                                </SelectItem>
                            </SelectContent>
                    </Select>
                </div>
            </div>  
                            
            <div className="cards">
                {
                    maintainers.map((maintainer) => {
                        return <MaintainerCard key={maintainer._id} data={maintainer} />
                    })
                }
            </div>
        </>
     );
}
 
export default Maintainers;