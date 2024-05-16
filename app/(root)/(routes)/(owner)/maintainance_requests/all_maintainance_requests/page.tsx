"use client"
import Pathname from "@/components/pathname";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MaintainanceRequestsReducerProps, PropertiesReducerProps, UnitsReducerProps } from "@/types";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { MaintainanceClient } from "./components/client";



const AllRequests = () => {
    const router = useRouter()
    const {maintainanceRequests} = useSelector(({maintainanceReducer} : MaintainanceRequestsReducerProps) => maintainanceReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)
    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    
    const formattedRequests = maintainanceRequests.map((
        {
            _id,
            date,
            requestNo,
            type,
            propertyId,
            unitId,
            issue,
            status,
            details,
            cost
        }) => {
            const propertyName  = properties.filter(({_id}) =>_id === propertyId)[0]?.name
            const unitName  = units.filter(({_id}) =>_id === unitId)[0].name
            return {
                _id,
                propertyId,
                unitId,
                property_unit : `${propertyName}/${unitName}`,
                date : format(date,"MMMM do, yyyy"),
                requestNo,
                type,
                issue,
                status,
                details,
                cost
            }
    })
   
    return ( 
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <Pathname />
                <div className="flex justify-between md:flex-row flex-col gap-2"> 
                    <h1 className="font-bold text-xl">Maintainance Requests</h1>
                    <Button className="lg:w-1/4 md:w-1/5 w-2/3" onClick={()=>router.push('/maintainance_requests/add')}>New Request</Button>
                </div>
                <Separator />

                <MaintainanceClient data={formattedRequests} />
                
            </div>
        </div>
     );
}
 
export default AllRequests;