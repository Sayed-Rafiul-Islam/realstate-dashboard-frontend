"use client"

import { PropertyProps } from "@/types";
interface PropertyCardProps {
    data : PropertyProps
}

import { CircleCheck, Edit, Home, LayoutDashboardIcon, MapPinned, MoreVertical, Trash } from "lucide-react";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import './property-card.css'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AlertModal } from "@/components/modals/alert-modal";
import toast from "react-hot-toast";
import { removeProperty } from "@/redux/properties/propertiesSlice";


const PropertyCard : React.FC<PropertyCardProps> = ({data}) => {

    const router = useRouter()
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onDelete = async () => {
        toast.success("Property Removed")
        setOpen(false)
        dispatch(removeProperty(data))       
    
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
        <div className="bg-gray-100 rounded-md overflow-hidden">
            <AlertModal
            isOpen={open} 
            onClose={()=>setOpen(false)} 
            onConfirm={onDelete} 
            loading={loading} />
        <div onClick={()=>router.push(`/properties/all_properties/${data._id}`)} className="cover-wrapper">
            <div className="relative cover-image">
                <Image fill src={data.coverImage} alt="building" />
            </div>
        </div>            
        <div className="mx-2 py-4 property-info">
            <div className="flex justify-between items-center mt-2">
                <h3 className="text-lg font-semibold">{data.name}</h3>
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
                        <DropdownMenuItem onClick={()=>router.push(`/properties/${data._id}`)}>
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
            <h4 className="flex gap-2 items-center text-xs text-gray-500"><MapPinned size={17} /> {data.location}</h4>
            <div className="grid grid-cols-2 gap-2 mt-4 bg-white rounded-md p-2 mb-2">
                <h5 className="flex items-center text-xs  gap-2"><Home size={15} />{data.unitCount} Units</h5>
                <h5 className="flex items-center text-xs  gap-2"><LayoutDashboardIcon size={15} />{data.rooms} Rooms</h5>
                <h5 className="flex items-center text-xs  gap-2"><CircleCheck size={15} />{data.available} Available</h5>
            </div>
            <Button onClick={()=>router.push(`/properties/all_properties/${data._id}`)} className="w-full bg-purple-600">View Details</Button>
        </div>
    </div>
     );
}
 
export default PropertyCard;