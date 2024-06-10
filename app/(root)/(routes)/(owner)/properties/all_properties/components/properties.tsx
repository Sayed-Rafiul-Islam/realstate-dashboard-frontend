"use client"


import { OwnerPropertyReducerProps, PropertyProps } from "@/types";
import PropertyCard from "./property-card";
import './property-card.css'
import { useSelector } from "react-redux";

const Properties = () => {

    const properties = useSelector(({ownerPropertyReducer} : OwnerPropertyReducerProps) => ownerPropertyReducer).ownerProperties
    console.log(properties)

    return ( 
        <div className="cards">
            {
                properties.length > 0 &&
                properties.map((property) => 
                    <PropertyCard key={property._id} data={property} />
                )
            }
        </div>
     );
}
 
export default Properties;