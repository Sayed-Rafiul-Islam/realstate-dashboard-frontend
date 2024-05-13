"use client"

import { useSelector } from "react-redux";
import { PropertyEditForm } from "./components/property-edit-form";
import { PackageProps, PackagesReducersProps, PropertiesReducerProps, PropertyProps, UnitProps, UnitsReducerProps } from "@/types";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import image from '@/images/buildings/b1.jpg'

const PropertyPage = ({
    params
} : {
    params : { id : string}
}) => {
    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)

    const initialData1 = properties.filter((item : PropertyProps)  =>{
        if (item._id === params.id) {
            return item
        } 
    })

    const data = initialData1.length === 0 ? false : initialData1[0] 

    const initialData2 = data ? units.filter((item : UnitProps)  =>{
        if (item.propertyId === data._id) {
            return item
        } 
    })
    :
    []

    const initialData = data ? {
        initialData1 : {
            _id : data._id,
            propertyName : data.name,
            description : data.description,
            address : data.location,
            image : data.coverImage,
            unitCount : data.unitCount,
            city : data.city,
            state : data.state,
            country : data.country,
            postCode : data.postCode
        },
        initialData2,
        initialData3 : {
            rent : data.rent,
            deposit : data.deposit,
            lateFee : data.lateFee,
            rentType : data.rentType
        }
    } 
    :
    null
    // console.log(initialData[0])
    
    return ( 
        <div>
            <div className="flex-1 p-8 pt-6 space-y-4">
                <PropertyEditForm initialData={initialData} />
            </div>
        </div>
     );
}
 
export default PropertyPage;