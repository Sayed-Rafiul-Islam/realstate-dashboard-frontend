"use client"

import { MaintainerProps, MaintainersReducerProps, PropertiesReducerProps, PropertyProps, UnitProps, UnitsReducerProps } from "@/types";
import { useDispatch, useSelector } from "react-redux"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Doughnut } from "react-chartjs-2";
import Image from "next/image";
import { Line } from 'react-chartjs-2';
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


    



    const chartData = {
        labels: data?.map(({label})=>label),
        datasets: [
          {
            label: 'Bill',
            data: data?.map(({number})=>number),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',

            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };



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
                        <Button onClick={()=>router.push(`/maintainers/${params.detail_id}`)} >Edit Info</Button>
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
                    
                   <div className="rounded-lg all-shadow py-4 md:px-4 px-4 lg:w-5/12 md:w-full">
                   <div className="mb-4 flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Maintainance Requests</h2>
                        <Button variant='outline'><ArrowLeft className="mr-2" size={15} />View All</Button>
                    </div>
                   <InvoicesClient data={formattedInvoices} />

                     
                   </div>
                    <div className="rounded-lg all-shadow py-4 md:px-4 px-4 lg:w-7/12 md:w-full">
                        <div className="mb-4 flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Invoices</h2>
                            <Button variant='outline'><ArrowLeft className="mr-2" size={15} />View All</Button>
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