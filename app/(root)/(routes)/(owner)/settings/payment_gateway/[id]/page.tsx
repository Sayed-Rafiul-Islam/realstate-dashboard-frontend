"use client"

import { useSelector } from "react-redux";
import { GatewayProps, GatewaysReducerProps} from "@/types";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { GatewayForm } from "./components/gateway-form";

const GatewayFormPage = ({
    params
} : {
    params : { id : string}
}) => {
    const {gateways} = useSelector(({gatewaysReducer} : GatewaysReducerProps) => gatewaysReducer)

    const initialData = gateways.filter((item : GatewayProps)  =>{
        if (item._id === params.id) {
            return item
        } 
    })
    
    return ( 
        <div>
            <div className="flex-1 pt-6 space-y-4">
                <GatewayForm initialData={initialData[0]} />
            </div>
        </div>
     );
}
 
export default GatewayFormPage;