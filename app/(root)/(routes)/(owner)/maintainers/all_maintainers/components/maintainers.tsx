"use client"
interface MaintainersProps {
    data : MaintainerProps[]
}

import './maintainer-card.css'
import { useEffect, useState } from 'react';
import { MaintainerProps } from '@/types';

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import { Button } from '@/components/ui/button';
import MaintainerCard from './maintainer-card';

const Maintainers : React.FC<MaintainersProps> = ({data}) => {

    const [maintainers, setMaintainers] = useState(data)

    const [types, setTypes] = useState<string[]>([''])


    const [type, setType] = useState('')
    const [status, setStatus] = useState('')


    useEffect(()=>{
        data.map((item)=> {
            const index = types.findIndex(i => i === item.type)
            if (index === -1) {
                types.push(item.type)
            }
        })
        setTypes(types.slice(1))
    },[])


    useEffect(()=>{
        if (type === '' && status === '') {
            setMaintainers(data)
        } else {
            if (type !== '' && status === '') {
                const temp = data.filter((item) => item.type === type) 
                setMaintainers(temp)
            } 
            else if ( status !== '' && type === '') {
                const temp = data.filter((item) => item.status === status) 
                setMaintainers(temp)
            }
            else {
                const temp = data.filter((item) => item.status === status && item.type === type) 
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
                        onValueChange={e=> setType(e)}
                        value={type}                              
                    >
                        <SelectTrigger className="select-filters">
                            <SelectValue 
                                placeholder="Select Type"
                            />
                        </SelectTrigger>
                            <SelectContent  >
                                {types.map((type,index)=>(
                                    <div >
                                        <SelectItem key={index} value={type} >
                                            {type}
                                        </SelectItem>
                                    </div>
                                ))}
                            </SelectContent>
                    </Select>
                    <Select
                        onValueChange={e=> setStatus(e)}
                        value={status}                              
                    >
                        <SelectTrigger className="select-filters">
                            <SelectValue 
                                placeholder="Select Status"
                            />
                        </SelectTrigger>
                            <SelectContent >
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
                <Button className='' onClick={showAll}>Show All</Button>
            </div>  
                            
            <div className="cards">
                {
                    maintainers.map((maintainer) => 
                        <MaintainerCard key={maintainer._id} data={maintainer} />
                    )
                }
            </div>
        </>
     );
}
 
export default Maintainers;