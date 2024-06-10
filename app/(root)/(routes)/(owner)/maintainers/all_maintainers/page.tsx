"use client"
import Pathname from "@/components/pathname";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OwnerInfoReducerProps, OwnerMaintainersReducerProps } from "@/types";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Maintainers from "./components/maintainers";
import { useEffect, useState } from "react";
import api from "@/actions/api";
import { getOwnerMaintainers } from "@/redux/data/owner/maintainersSlice";
import { getOwnerMaintainanceTypes } from "@/redux/data/owner/settings/maintainanceTypesSlice";


const ALLMaintainers = () => {
    const [isMounted, setIsMounted] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()

    const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo
    useEffect(()=>{
        const getData = async () => {
            if (owner) {
                    const {data,status} = await api.get(`getMaintainers?id=${owner._id}`,{validateStatus: () => true})
                    const result = await api.get(`getMaintainaceType?id=${owner._id}`,{validateStatus: () => true})
                    dispatch(getOwnerMaintainanceTypes(result.data))
                    dispatch(getOwnerMaintainers(data))
                }
                setIsMounted(true)
            }
            getData()
    },[])
    const maintainers = useSelector(({ownerMaintainersReducer} : OwnerMaintainersReducerProps) => ownerMaintainersReducer).ownerMaintainers

    if (!isMounted) {
        return null
    }
   
    return ( 
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <Pathname />
                <div className="flex justify-between md:flex-row flex-col gap-2"> 
                    <h1 className="font-bold text-xl">All Maintainers</h1>
                    <Button className="lg:w-1/4 md:w-1/5 w-2/3 bg-purple-600" onClick={()=>router.push('/maintainers/add')}>Add Maintainer</Button>
                </div>
                <Separator />

                <Maintainers data={maintainers} />
            </div>
        </div>
     );
}
 
export default ALLMaintainers;