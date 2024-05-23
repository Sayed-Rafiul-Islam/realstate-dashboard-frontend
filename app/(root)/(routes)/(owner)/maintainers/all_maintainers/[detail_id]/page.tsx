"use client"

import { MaintainanceRequestsReducerProps, MaintainerProps, MaintainersReducerProps, PropertiesReducerProps, PropertyProps, UnitProps, UnitsReducerProps } from "@/types";
import { useDispatch, useSelector } from "react-redux"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(ArcElement, Tooltip, Legend);

import './maintainer-details.css'
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/modals/alert-modal";
import { useEffect, useState } from "react";
import { InvoicesClient } from "./components/client";
import { ArrowLeft } from "lucide-react";
import { removeMaintainer } from "@/redux/maintainers/maintainersSlice";

const MaintainerDetails = ({
    params
} : {
    params : { detail_id : string}
}) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const {maintainers} = useSelector(({maintainersReducer} : MaintainersReducerProps) => maintainersReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)
    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    const threeRequests = useSelector(({maintainanceReducer} : MaintainanceRequestsReducerProps)=>maintainanceReducer).maintainanceRequests.slice(0,3)

    const onDelete = async () => {
        dispatch(removeMaintainer(maintainer))
        router.push(`/maintainers/all_maintainers`)
        toast.success(`Maintainer Deleted`)
    }





    const maintainer = maintainers.filter((item : MaintainerProps)  =>{
        if (item._id === params.detail_id) {
            return item
        } 
    })[0]

    const property = properties.filter((item : PropertyProps)  =>{
        if (item._id === maintainer?.propertyId) {
            return item
        } 
    })[0]

    const unit = units.filter((item : UnitProps)  =>{
        if (item._id === maintainer?.unitId) {
            return item
        } 
    })[0]

    const invoices = [
        {
            _id : '1',
            date : '2024-05-02T17:34:59.911+00:00',
            invoiceNo : 446689,
            amount : 15000,
            category : "Rent",
            status : true
        },
        {
            _id : '2',
            date : '2024-05-02T17:34:59.911+00:00',
            invoiceNo : 477689,
            amount : 2000,
            category : "Utility",
            status : true
        },
        {
            _id : '3',
            date : '2024-05-02T17:34:59.911+00:00',
            invoiceNo : 449689,
            amount : 15000,
            category : "Rent",
            status : false
        }
    ]

    const formattedInvoices = invoices.map((
        {
            _id,
            date,
            invoiceNo,
            amount,
            category,
            status
        }) => ({
            _id,
            date : format(date,"MMMM do, yyyy"),
            invoiceNo : `#${invoiceNo}`,
            amount : `BDT ${amount}`,
            category,
            status
    }))


    const [isMounted, setIsMounted] = useState(false)
    const [data, setData] = useState<{label : string,number : number}[]>()

    useEffect(()=>{
        setIsMounted(true)
        let x : {label : string,number : number}[] = []

        invoices.map(({amount,category})=>{
            const index = x.findIndex(item => item.label === category)
            if (index === -1) {
                x.push({label : category,number : amount})
            } else {
                x[index].number = x[index].number + amount
            }
        })
        setData(x)
    },[])

    if (!isMounted) {
        return null
    }



    return ( 
        <>
            {
                maintainer && 
                <div>
                <AlertModal
                    isOpen={open} 
                    onClose={()=>setOpen(false)} 
                    onConfirm={onDelete} 
                    loading={loading}
                />
                {/* heading  */}
                <div className="flex md:justify-end mt-5">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hover:text-indigo-500 transition-all">
                                <Link prefetch href='/'>Dashboard</Link>
                            </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem className="hover:text-indigo-500 transition-all">
                                <Link prefetch href='/maintainers/all_maintainers'>Maintainers</Link>
                            </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                                <BreadcrumbPage>
                                    Maintainer Profile
                                </BreadcrumbPage>
                            </BreadcrumbItem>   
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="maintainer-heading my-4">
                    <h1 className="text-2xl font-bold">Maintainer Profile</h1> 
                    <div className="flex justify-end gap-2 mt-4">
                        <Button onClick={()=>setOpen(true)} className="border border-orange-500" variant='outline'>Delete Maintainer</Button>
                        <Button className="bg-purple-600" onClick={()=>router.push(`/maintainers/${params.detail_id}`)} >Edit Info</Button>
                    </div>
                </div>
                <Separator />
                {/* ----------------------------------------------------------------------------------- */}
    
                <div className="details w-full mt-5 gap-4">
                    <div className="w-1/2 rounded-lg all-shadow">
                        <div className="maintainer-image-wrapper">
                            <Image className="rounded-xl" fill src={maintainer.image}  alt="picture" />
                        </div>
                        <div className="pb-5">
                            <h2 className="text-center text-2xl font-semibold my-5">{maintainer.name}</h2>
                            <div className="px-5 flex flex-col gap-2">
                                <div className="text-sm flex gap-2 w-full items-center">
                                    <h5 className="font-semibold w-1/2">Age</h5>
                                    <h5>{maintainer.age}</h5>
                                </div>
                                <div className="text-sm flex gap-2 w-full items-center">
                                    <h5 className="font-semibold w-1/2">Contact</h5>
                                    <h5>{maintainer.phone}</h5>
                                </div>
                                <div className="text-sm flex gap-2 w-full items-center">
                                    <h5 className="font-semibold w-1/2">Email</h5>
                                    <h5>{maintainer.email}</h5>
                                </div>
                                <div className="text-sm flex gap-2 w-full items-center">
                                    <h5 className="font-semibold w-1/2">Type</h5>
                                    <h5>{maintainer.type}</h5>
                                </div>
                                <div className="text-sm flex gap-2 w-full items-center">
                                    <h5 className="font-semibold w-1/2">NID Number</h5>
                                    <h5>{maintainer.NID}</h5>
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
                                    <h5>{maintainer.address}</h5>
                                </div>
                                <div className="text-sm flex gap-2 w-full items-center">
                                    <h5 className="w-1/2">City</h5>
                                    <h5>{maintainer.city}</h5>
                                </div>
                                <div className="text-sm flex gap-2 w-full items-center">
                                    <h5 className="w-1/2">State</h5>
                                    <h5>{maintainer.state}</h5>
                                </div>
                                <div className="text-sm flex gap-2 w-full items-center">
                                    <h5 className="w-1/2">Country</h5>
                                    <h5>{maintainer.country}</h5>
                                </div>
                                <div className="text-sm flex gap-2 w-full items-center">
                                    <h5 className="w-1/2">Postal Code</h5>
                                    <h5>{maintainer.postalCode}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg all-shadow py-6">
                            <h2 className="text-2xl font-semibold px-4 pb-6">Assigned House</h2>
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
                            </div>
                        </div>
                    </div>
                </div>

                {/* invoices */}

                <div className="mt-10 flex lg:flex-row flex-col gap-5">
                    
                   <div className="rounded-lg all-shadow py-4 md:px-4 px-4 lg:w-1/2 md:w-full">
                   <div className="mb-4 flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Maintainance Requests</h2>
                        <button className="text-sm text-blue-500 flex gap-2 items-center" ><ArrowLeft size={15} />View All</button>
                    </div>
                    <div className="flex flex-col gap-2">
                        {
                            threeRequests.map(({_id,date,propertyId,unitId,maintainerId,issue,status})=> {
                                const property = properties.filter((item) => propertyId === item._id)[0].name
                                const unit = units.filter((item) => unitId === item._id)[0].name
                                const maintainer = maintainers.filter((item) => maintainerId === item._id)[0].name

                                let statusStyle = ''
                                let border = ''

                                if ( status === 'Complete') {
                                    statusStyle = 'text-indigo-600 text-xs bg-indigo-100 px-4 py-2 rounded-lg'
                                    border = 'border-l-4 border-indigo-500'
                                } else if ( status === 'Incomplete' ) {
                                    statusStyle = 'text-red-600 bg-red-100 px-4 py-2 rounded-lg text-xs'
                                    border = 'border-l-4 border-red-500'
                                } else {
                                    statusStyle = 'text-amber-600 bg-amber-100 px-3 py-2 rounded-lg text-xs'
                                    border = 'border-l-4 border-amber-500'
                                }
                                return (
                                    <div key={_id} className={`${border} flex md:flex-row flex-col md:items-center justify-between rounded-md px-2 py-1`}>
                                        <div>
                                            <h4 className="font-semibold">{format(date,"MMMM do, yyyy")}</h4>
                                            <h5 className="text-xs text-gray-500">{issue}</h5>
                                            <h5 className="text-xs text-gray-500"> in {property}/{unit}</h5>
                                            <p className="text-gray-400 text-xs">Assigned to <span className="text-primary">{maintainer}</span></p>
                                        </div>
                                        <h4 className={`${statusStyle} md:my-0 my-2 w-fit`}>{status}</h4>
                                    </div>
                                )
                            })
                        }
                    </div>

                     
                   </div>
                    <div className="rounded-lg all-shadow py-4 md:px-4 px-4 lg:w-1/2 md:w-full">
                        <div className="mb-4 flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Invoices</h2>
                            <button className="text-sm text-blue-500 flex gap-2 items-center"><ArrowLeft size={15} />View All</button>
                        </div>
                        <InvoicesClient data={formattedInvoices} />
                    </div>
                </div>
    
            </div>
            }
        </>
     );
}
 
export default MaintainerDetails;