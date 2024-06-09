"use client"

import { PropertiesReducerProps, PropertyProps, UnitProps, UnitsReducerProps, MaintainanceRequestProps, MaintainanceRequestsReducerProps, MaintainanceTypesReducerProps, TenantInfoReducerProps } from "@/types"

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/heading"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Pathname from '@/components/pathname'
import './maintainance-form.css'
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import api from "@/actions/api"
import { useRouter } from "next/navigation"
import { addMaintainanceRequest, updateMaintainanceRequest } from "@/redux/maintainanceRequests/maintainanceRequestsSlice"
import { nanoid } from "@reduxjs/toolkit"
import { getTime } from "date-fns"
import PdfUpload from "@/components/pdf-upload"
import { addNotification } from "@/redux/report/notificationsSlice"


type MaintainanceRequestFormValues = z.infer<typeof formSchema>

interface MaintainanceRequestFormProps {
    initialData: MaintainanceRequestProps
}

const formSchema = z.object({

    propertyId : z.string().min(1),
    unitId : z.string().min(1),
    type : z.string().min(1),
    status : z.string().min(1, {message : "Status Required"}),
    paymentStatus : z.string(),
    details : z.string().min(1),
    attachment : z.string().min(1),

})



export const MaintainanceRequestForm : React.FC<MaintainanceRequestFormProps> = ({
    initialData
}) => {


    const tenant = useSelector(({tenantInfoReducer} : TenantInfoReducerProps)=> tenantInfoReducer).tenantInfo
    const {maintainanceTypes} = useSelector(({maintainanceTypesReducer} : MaintainanceTypesReducerProps) => maintainanceTypesReducer)

    const dispatch = useDispatch()
    const router = useRouter()

    const title = 'Edit Maintainance'
    const action = 'Save Changes'
    const description = "Edit maintaince info"
    const toastMessage = "Maintainance info updated"



    const [loading, setLoading] = useState(false)
    const form = useForm<MaintainanceRequestFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData || {
            propertyId : tenant.property._id,
            unitId : tenant.unit._id,
            type : '',
            status : '',
            details : '',
            attachment : '',
            paymentStatus : 'Due'
        }
    })

    
    const onSubmit = async (data : MaintainanceRequestFormValues) => {
            const formData = {...data,_id : initialData._id, requestNo : initialData.requestNo}
            const result = await api.patch(`updateRequest`,formData)
            dispatch(updateMaintainanceRequest(result.data))
            toast.success(toastMessage)
            router.push('/maintainer_requests')
        }
    

    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if (!isMounted) {
        return null
    }



    return (
        <div className='add mt-5'>
            <div className="flex items-center justify-between heading">
                <Heading
                    title={title}
                    description={description}
                />
                <Pathname />
            </div>
            <Separator className='my-5' />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                         <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status <span className='text-red-500'>*</span></FormLabel>
                                    <Select 
                                            disabled={loading} 
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>                            
                                                <SelectTrigger>
                                                    <SelectValue 
                                                        defaultValue={field.value}
                                                        placeholder="Select Status"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Complete" >
                                                    Complete
                                                </SelectItem>
                                                <SelectItem value="Incomplete" >
                                                    Incomplete
                                                </SelectItem>
                                                <SelectItem value="In Progress" >
                                                    In Progress
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className='ml-auto bg-purple-500' type='submit'>
                        {action}
                    </Button>
                </form>
            </Form> 
        </div>
    )
}