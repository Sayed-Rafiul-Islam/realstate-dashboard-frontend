"use client"

import { PropertiesReducerProps, PropertyProps, TenantProps, TenantsReducerProps, UnitProps, UnitsReducerProps } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

import './tenant-details.css'
import { format } from "date-fns";
import { removeTenant } from "@/redux/tenants/tenantsSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/modals/alert-modal";
import { useEffect, useState } from "react";

const TenantDetails = ({
    params
} : {
    params : { id : string}
}) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const {tenants} = useSelector(({tenantsReducer} : TenantsReducerProps) => tenantsReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)
    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)

    const onDelete = async () => {
        dispatch(removeTenant(tenant))
        router.push(`/tenants`)
        toast.success(`Tenant Deleted`)
    }





    const tenant = tenants.filter((item : TenantProps)  =>{
        if (item._id === params.id) {
            return item
        } 
    })[0]





    const property = properties.filter((item : PropertyProps)  =>{
        if (item._id === tenant?.propertyId) {
            return item
        } 
    })[0]

    const unit = units.filter((item : UnitProps)  =>{
        if (item._id === tenant?.unitId) {
            return item
        } 
    })[0]


    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if (!isMounted) {
        return null
    }



    return ( 
        <>
            {
                tenant && 
                <div>
                <AlertModal
                    isOpen={open} 
                    onClose={()=>setOpen(false)} 
                    onConfirm={onDelete} 
                    loading={loading}
                />
                {/* heading  */}
                <div className="flex md:justify-end">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hover:text-indigo-500 transition-all">
                                <Link prefetch href='/'>Dashboard</Link>
                            </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem className="hover:text-indigo-500 transition-all">
                                <Link prefetch href='/tenants'>Tenants</Link>
                            </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                                <BreadcrumbPage>
                                    Tenant Profile
                                </BreadcrumbPage>
                            </BreadcrumbItem>   
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="tenant-heading my-4">
                    <h1 className="text-2xl font-bold">Tenant Profile</h1> 
                    <div className="flex justify-end gap-2 mt-4">
                        <Button onClick={()=>setOpen(true)} className="border border-orange-500" variant='outline'>Delete Tenant</Button>
                        <Button onClick={()=>router.push(`/tenants/${params.id}`)} >Edit Info</Button>
                    </div>
                </div>
                <Separator />
                {/* ----------------------------------------------------------------------------------- */}
    
                <div className="details w-full mt-5 gap-4">
                    <div className="w-1/2 rounded-lg all-shadow">
                        <div className="tenant-image-wrapper">
                            <Image className="rounded-xl" fill src={tenant.image}  alt="picture" />
                        </div>
                        <div className="pb-5">
                            <h2 className="text-center text-2xl font-semibold my-5">{tenant.name}</h2>
                            <div className="px-5 flex flex-col gap-2">
                                <div className="text-sm flex gap-2 w-full items-center">
                                    <h5 className="font-semibold w-1/2">Age</h5>
                                    <h5>{tenant.age}</h5>
                                </div>
                                <div className="text-sm flex gap-2 w-full items-center">
                                    <h5 className="font-semibold w-1/2">Contact</h5>
                                    <h5>{tenant.phone}</h5>
                                </div>
                                <div className="text-sm flex gap-2 w-full items-center">
                                    <h5 className="font-semibold w-1/2">Email</h5>
                                    <h5>{tenant.email}</h5>
                                </div>
                                <div className="text-sm flex gap-2 w-full items-center">
                                    <h5 className="font-semibold w-1/2">Family Members</h5>
                                    <h5>{tenant.familyMember}</h5>
                                </div>
                                <div className="text-sm flex gap-2 w-full items-center">
                                    <h5 className="font-semibold w-1/2">Occupation</h5>
                                    <h5>{tenant.occupation}</h5>
                                </div>
                                <div className="text-sm flex gap-2 w-full items-center">
                                    <h5 className="font-semibold w-1/2">NID Number</h5>
                                    <h5>{tenant.NID}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="rounded-lg all-shadow mb-5 py-6">
                            <h2 className="text-2xl font-semibold px-4 pb-6">Parmanent Address</h2>
                            <div className="px-5 flex flex-col gap-5">
                                <div className="text-sm flex gap-2 w-full items-center">
                                    <h5 className="w-1/2">Address</h5>
                                    <h5>{tenant.address}</h5>
                                </div>
                                <div className="text-sm flex gap-2 w-full items-center">
                                    <h5 className="w-1/2">City</h5>
                                    <h5>{tenant.city}</h5>
                                </div>
                                <div className="text-sm flex gap-2 w-full items-center">
                                    <h5 className="w-1/2">State</h5>
                                    <h5>{tenant.state}</h5>
                                </div>
                                <div className="text-sm flex gap-2 w-full items-center">
                                    <h5 className="w-1/2">Country</h5>
                                    <h5>{tenant.country}</h5>
                                </div>
                                <div className="text-sm flex gap-2 w-full items-center">
                                    <h5 className="w-1/2">Postal Code</h5>
                                    <h5>{tenant.postalCode}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg all-shadow py-6">
                            <h2 className="text-2xl font-semibold px-4 pb-6">House Details</h2>
                            <div className="px-5 flex flex-col gap-5">
                                <div className="text-sm flex gap-2 w-full items-center">
                                    <h5 className="w-1/2">Name</h5>
                                    <h5>{property ? property.name : "N/A"}</h5>
                                </div>
                                <div className="text-sm flex gap-2 w-full items-center">
                                    <h5 className="w-1/2">Address</h5>
                                    <h5>{property ? property.location : "N/A"}</h5>
                                </div>
                                <div className="text-sm flex gap-2 w-full items-center">
                                    <h5 className="w-1/2">Unit</h5>
                                    <h5>{unit ? unit.name : "N/A"}</h5>
                                </div>
                                <div className="text-sm flex gap-2 w-full items-center">
                                    <h5 className="w-1/2">General Rent</h5>
                                    <h5>{unit ? '$ ' + unit.rent : "N/A"}</h5>
                                </div>
                                <div className="text-sm flex gap-2 w-full items-center">
                                    <h5 className="w-1/2">Payment Due Date</h5>
                                    <h5>{format(tenant.dueDate,"MMMM do, yyyy")}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
            </div>
            }
        </>
     );
}
 
export default TenantDetails;