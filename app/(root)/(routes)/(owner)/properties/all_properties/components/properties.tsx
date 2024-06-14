"use client"


import { OwnerPropertyReducerProps, PropertyProps } from "@/types";
import PropertyCard from "./property-card";
import './property-card.css'
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Properties = () => {


    const properties = useSelector(({ownerPropertyReducer} : OwnerPropertyReducerProps) => ownerPropertyReducer).ownerProperties
    const router = useRouter()

    const [data,setData] = useState(properties)

    useEffect(()=>{
        router.refresh()
        setData(properties)
    },[data])

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