"use client"

import { useSelector } from "react-redux";
import { PropertiesReducerProps, PropertyProps, TenantsReducerProps, UnitProps, UnitsReducerProps } from "@/types";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPinned } from "lucide-react";
import './details.css'
import Image from "next/image";
import { UnitsClient } from "./components/client";
import { UnitColumn } from "./components/column";
import { useRouter } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

const PropertyDetails = ({
    params
} : {
    params : { detail_id : string}
}) => {
    const router = useRouter()
    const tenants = useSelector(({tenantsReducer} : TenantsReducerProps) => tenantsReducer).tenants
    const property = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer).properties
    .filter((property) => property._id === params.detail_id)[0]
    const units = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer).units
    .filter((unit)=>unit.property?._id === params.detail_id)


    const tenantsCount = tenants.filter((tenant) => tenant.property._id === property._id).length
    const available = property.unitCount - tenantsCount

    const formattedUnits = units.map((
        {
            _id,
            name,
            description,
            condition,
            squareFeet,
            bedrooms,
            washrooms,
            kitchens,
        },index : number) => {
            return {
                _id,
                serial : index + 1,
                name,
                description,
                condition,
                squareFeet,
                bedrooms,
                washrooms,
                kitchens,
            }
        })    
    
    return ( 
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                    <h1 className="font-bold text-xl">All Packages</h1>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hover:text-indigo-500 transition-all">
                                <Link prefetch href='/'>Dashboard</Link>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator />

                            <BreadcrumbItem className="hover:text-indigo-500 transition-all">
                                <Link prefetch href='/properties/all_properties'>All Properties</Link>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator />
 
                            <BreadcrumbItem >
                                <BreadcrumbPage>
                                    Details
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                </div>
                <Separator />
                <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4"> 
                    <div>
                        <h2 className="text-2xl font-semibold">{property.name}</h2>
                        <h5 className="text-sm flex items-center gap-2 text-gray-500 mt-2"><MapPinned size={20} /> {property.address}</h5>
                    </div>
                    <Button onClick={()=>router.push(`/properties/${property._id}`)} variant='outline' className="flex gap-2 w-fit"><ArrowLeft size={20} /> Edit Property</Button>
                </div>


                {/* details */}
                <div>
                    {/* Heading */}
                    <div className="relative property-image">
                        <Image className="rounded-xl" src={property.coverImage} fill alt="cover-image" />
                    </div>
                    <div className="my-8">
                        <h3 className="text-xl font-semibold">Description</h3>
                        <p className="text-sm text-gray-500 text-justify mt-2">{property.description}</p>
                    </div>
                    {/* --------------------------------------------------------------------------------- */}
                    <div>
                        {/* image gallery  */}
                    </div>
                        {/* Property details */}
                    <div>
                        <h3 className="text-xl font-semibold">Property Details</h3>
                        <div className="bg-gray-100 mt-2 py-2 text-sm text-gray-500 rounded-lg">
                            <div className="flex justify-between border-b border-gray-200 py-4 mx-5">
                                <h4>Total Unit</h4>
                                <h4>{property.unitCount}</h4>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 py-4 mx-5">
                                <h4>Lease Available</h4>
                                <h4>{available}</h4>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 py-4 mx-5">
                                <h4>Current Tenants</h4>
                                <h4>{tenantsCount}</h4>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 py-4 mx-5">
                                <h4>Security Deposit</h4>
                                <h4>{property.deposit}</h4>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 py-4 mx-5">
                                <h4>Late Fee</h4>
                                <h4>{property.lateFee}</h4>
                            </div>
                        </div>
                    </div>

                    {/* Units details */}
                    <div className="mt-5">
                        <h3 className="text-xl font-semibold">All Unit Details</h3>
                        <div className="bg-gray-100 mt-2 py-2 text-sm text-gray-500 rounded-lg">
                            <UnitsClient data={formattedUnits} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default PropertyDetails;