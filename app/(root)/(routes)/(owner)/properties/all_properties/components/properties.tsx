"use client"


import { OwnerInfoReducerProps, OwnerPropertyReducerProps, PropertyProps } from "@/types";
import PropertyCard from "./property-card";
import './property-card.css'
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/actions/api";

const Properties = () => {

    const properties = useSelector(({ownerPropertyReducer} : OwnerPropertyReducerProps) => ownerPropertyReducer).ownerProperties
    const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo

    const [data,setData] = useState(properties)
   

    useEffect(()=>{
        const getData = async () => {
            const {data,status} =  await api.get(`getOwnerProperties?id=${owner._id}`,{validateStatus: () => true})
            if (status === 200) {
                setData(data)
            }
        }
        getData()
    },[])

    return ( 
        <div className="cards">
            {
                data.length > 0 &&
                data.map((d) => 
                    <PropertyCard key={d._id} data={d} />
                )
            }
        </div>
     );
}
 
export default Properties;