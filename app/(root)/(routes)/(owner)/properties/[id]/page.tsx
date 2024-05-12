"use client"

import { useSelector } from "react-redux";
import { PropertyEditForm } from "./components/property-edit-form";
import { PackageProps, PackagesReducersProps, PropertiesReducerProps, PropertyProps, UnitsReducerProps } from "@/types";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import image from '@/images/buildings/b1.jpg'

const PropertyPage = ({
    params
} : {
    params : { id : string}
}) => {
    // const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    // const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)

    // const initialData = properties.filter((item : PropertyProps)  =>{
    //     if (item._id === params.id) {
    //         return item
    //     } 
    // })

    const initialData = {
        initialData1 : {
            _id : "1",
            propertyName : 'p1',
            unitCount : 3,
            description : "blah blah blah",
            image : 'image',
            address : 'address',
            city : 'city',
            state : 'state',
            country : 'country',
            postCode : '5400'
        },
            initialData2 : [
                {
                    _id : '1',
                    unitName : 'unit-1',
                    bedrooms : 3,
                    bathrooms : 2,
                    kitchens : 1,
                    squarefits : 200,
                    condition : "Good",
                    image : '',
                    description : "unit-1 description"
                },
                {
                    _id : '2',
                    unitName : 'unit-2',
                    bedrooms : 3,
                    bathrooms : 2,
                    kitchens : 1,
                    squarefits : 200,
                    condition : "Good",
                    image : '',
                    description : "unit-2 description"
                },
                {
                    _id : '3',
                    unitName : 'unit-3',
                    bedrooms : 3,
                    bathrooms : 2,
                    kitchens : 1,
                    squarefits : 200,
                    condition : "Good",
                    image : '',
                    description : "unit-3 description"
                }
            ],
        initialData3 : {
            rent : 15000,
            deposit : 5000,
            lateFee : 500,
            rentType : "monthly"
        }
    }
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