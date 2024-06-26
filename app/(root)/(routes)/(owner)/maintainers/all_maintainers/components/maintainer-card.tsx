"use client"

import { MaintainanceTypeProps, MaintainanceTypesReducerProps, MaintainerProps } from "@/types";
interface MaintainerCardProps {
    data : MaintainerProps,
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
import './maintainer-card.css'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AlertModal } from "@/components/modals/alert-modal";
import toast from "react-hot-toast";
import { removeMaintainer } from "@/redux/maintainers/maintainersSlice";
import api from "@/actions/api";
import { removeOwnerMaintainer } from "@/redux/data/owner/maintainersSlice";


const MaintainerCard : React.FC<MaintainerCardProps> = ({data}) => {

    const router = useRouter()
    const dispatch = useDispatch()

    const [statusStyle, setStatusStyle] = useState('')
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        if (data.status === "Available") {
            setStatusStyle("bg-indigo-100 text-primary px-2 py-1 block rounded-md")
        } else if (data.status === "Pending") {
            setStatusStyle("bg-amber-100 text-amber-500 px-2 py-1 block rounded-md")
        } else {
            setStatusStyle("bg-red-100 text-red-500 px-2 py-1 block rounded-md")
        }
    },[data.status])

    const onDelete = async () => {
        const result = await api.delete(`deleteMaintainer?id=${data._id}`,{validateStatus: () => true})
        if (result.status === 200) {
            dispatch(removeOwnerMaintainer(data))
            toast.success("Maintainer Removed")
        } else {
            toast.error("Something went wrong.")
            // toast.error("Remove associated units first.")
        }
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
                            <DropdownMenuItem onClick={()=>router.push(`/maintainers/${data._id}`)}>
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
                        <h4>Email</h4>
                        <h4>{data.user.email}</h4>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                        <h4>Type</h4>
                        <h4>{data.type.maintainer}</h4>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                        <h4>Pending Requests</h4>
                        <h4>{data.pendingRequest}</h4>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                        <h4>Status</h4>
                        <h4 className={statusStyle}>{data.status}</h4>
                    </div>
                </div>

                <div className="w-5/6 mx-auto mb-3">
                    <Button onClick={()=>router.push(`/maintainers/all_maintainers/${data._id}`)} className="w-full bg-purple-500">View Details</Button>
                </div>
                      
            </div>
        </>
        
     );
}
 
export default MaintainerCard;