"use client"

import { OwnerInfoReducerProps, OwnerPropertyReducerProps, PropertiesReducerProps, PropertyProps  } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Properties from "@/app/(root)/(routes)/(owner)/properties/all_properties/components/properties";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import api from "@/actions/api";
import { getOwnerProperties } from "@/redux/data/owner/propertiesSlice";


const AllPropertiesPage = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo

    const handleAddProperty = () => {
        if (owner.activePackage) {
            if (owner.activePackage.maxProperty > owner.propertyCount) {
                router.push('/properties/add')
            } else {
                toast.error("Max property limit reached.")
            }
        } else {
            toast.error("You have no active package")
        }

    }

    return ( 
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <Pathname />
                <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                    <h1 className="font-bold text-xl">All Properties</h1>
                    {
                        owner.activePackage &&
                        <Button 
                            disabled={owner.activePackage.maxProperty > owner.propertyCount ? false : true}
                            onClick={handleAddProperty}  
                            className="bg-purple-600"
                        >
                            Add New Property
                        </Button>
                    }
                </div>
                <Separator />
                <div>
                    <Properties />
                </div>
            </div>
        </div>
     );
}
 
export default AllPropertiesPage;