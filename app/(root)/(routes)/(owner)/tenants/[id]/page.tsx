"use client"

import { useSelector } from "react-redux";
import { PropertiesReducerProps, PropertyProps, TenantProps, TenantsReducerProps, UnitProps, UnitsReducerProps } from "@/types";
import { TenantForm } from "./components/tenant-form";

const TenantSettingsPage = ({
    params
} : {
    params : { id : string}
}) => {
    const {tenants} = useSelector(({tenantsReducer} : TenantsReducerProps) => tenantsReducer)
    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)

    const tenantData = tenants.filter((item : TenantProps)  =>{
        if (item._id === params.id) {
            return item
        } 
    })

    const data = tenantData.length === 0 ? false : tenantData[0] 

    const propertyData = data ? properties.filter((item : PropertyProps)  =>{
        if (item._id === data.propertyId) {
            return item
        } 
    })
    :
    []

    const unitData = data ? units.filter((item : UnitProps)  =>{
        if (item._id === data.unitId) {
            return item
        } 
    })
    :
    []


    const initialData = data ? {
        initialData1 : {
            _id : data._id,
            name : data.name,
            email : data.email,
            phone : data.phone,
            NID : data.NID,
            occupation : data.occupation,
            age : data.age,
            familyMember : data.familyMember,
            image : data.image,
            address : data.address,
            city : data.city,
            state : data.state,
            country : data.country,
            postalCode : data.postalCode,
            status : data.status
        },
        initialData2 : {
            property : propertyData[0]._id,
            unit : unitData[0]._id,
            startDate : data.startDate,
            endDate : data.endDate,
            rent : propertyData[0].rent,
            deposit : propertyData[0].deposit,
            lateFee : propertyData[0].lateFee,
            rentType : propertyData[0].rentType,
            due : data.due
        },
        initialData3 : {
            propertyDoc : data.propertyDoc,
            personalDoc : data.personalDoc,
        }
    } 
    :
    null
    
    return ( 
            <TenantForm initialData={initialData} />
     );
}
 
export default TenantSettingsPage;