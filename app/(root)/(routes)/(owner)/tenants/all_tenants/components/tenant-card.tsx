"use client"

import { PropertyProps } from "@/types";
interface TenantCardProps {
    data : TenantColumn
}

import { CircleCheck, Edit, Eye, Home, LayoutDashboardIcon, MapPinned, MoreVertical, Trash } from "lucide-react";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import './tenant-card.css'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AlertModal } from "@/components/modals/alert-modal";
import toast from "react-hot-toast";
import { removeProperty } from "@/redux/properties/propertiesSlice";
import { TenantColumn } from "@/app/(root)/(routes)/(owner)/tenants/tenants_history/components/column";
import { Separator } from "@/components/ui/separator";
import { removeTenant } from "@/redux/tenants/tenantsSlice";
import api from "@/actions/api";
import { removeOwnerTenant } from "@/redux/data/owner/tenantsSlice";


const TenantCard : React.FC<TenantCardProps> = ({data}) => {

    const router = useRouter()
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onDelete = async () => {
        await api.delete(`deleteTenant?id=${data._id}&userId=${data.user._id}`,{validateStatus: () => true})
        dispatch(removeOwnerTenant(data))       
        toast.success("Property Removed")
        setOpen(false)
    
}


    // ---------------------------------------------------------------------------------------------
    // anti hydration

    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if (!isMounted) {
        return null
    }
    return ( 
        <>
            <AlertModal
            isOpen={open} 
            onClose={()=>setOpen(false)} 
            onConfirm={onDelete} 
            loading={loading} />

            <div className="all-shadow rounded-md overflow-hidden">
                <div className="flex justify-between items-center mx-3 px-3 py-5 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <div className="relative h-[40px] w-[40px]">
                            <Image className="rounded-full" fill src={data.user.imageUrl} alt="human" />
                        </div>
                        <h3>{data.name}</h3>
                    </div> 
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='ghost' className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                                Actions
                            </DropdownMenuLabel>
                            <DropdownMenuItem onClick={()=>router.push(`/tenants/${data._id}`)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={()=>setOpen(true)}>
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>   
                </div>  

                <div className="w-5/6 mx-auto flex flex-col gap-3 my-5">
                    <div className="flex justify-between items-center text-xs text-gray-500">
                        <h4>Contact</h4>
                        <h4>{data.user.contactNo}</h4>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                        <h4>Propery</h4>
                        <h4>{data.property.name}</h4>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                        <h4>Unit</h4>
                        <h4>{data.unit.name}</h4>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                        <h4>Rent</h4>
                        <h4>{data.property.rent} BDT / {data.property.rentType}</h4>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                        <h4>Status</h4>
                        <h4>
                            {
                                data.status ?
                                <span className="bg-indigo-100 text-primary px-2 py-1 block rounded-md">Active</span>
                                :
                                <span className="bg-amber-100 text-amber-500 px-2 py-1 block rounded-md">Inactive</span>
                            }
                        </h4>
                    </div>
                </div>

                <div className="w-5/6 mx-auto mb-3">
                    <Button onClick={()=>router.push(`/tenants/all_tenants/${data._id}`)} className="w-full bg-purple-600">View Details</Button>
                </div>
                      
            </div>
        </>
        
     );
}
 
export default TenantCard;