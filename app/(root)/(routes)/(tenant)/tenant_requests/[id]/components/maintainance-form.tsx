"use client"

import { PropertiesReducerProps, PropertyProps, UnitProps, UnitsReducerProps, MaintainanceRequestProps, MaintainanceRequestsReducerProps, MaintainanceTypesReducerProps, TenantInfoReducerProps, OwnerMaintainanceTypesReducerProps } from "@/types"

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
import { addTenantMaintainanceRequest, updateTenantMaintainanceRequest } from "@/redux/data/tenant/maintainanceRequestsSlice"


type MaintainanceRequestFormValues = z.infer<typeof formSchema>

interface MaintainanceRequestFormProps {
    initialData: MaintainanceRequestProps
}

const formSchema = z.object({
    type : z.string().min(1, {message : "Maintainer Type Required"}),
    details : z.string().min(1, {message : "Description Required"}),
    attachment : z.string().min(1, {message : "Attachment Required"}),

})

export const MaintainanceRequestForm : React.FC<MaintainanceRequestFormProps> = ({
    initialData
}) => {


    const tenant = useSelector(({tenantInfoReducer} : TenantInfoReducerProps)=> tenantInfoReducer).tenantInfo
    const maintainanceTypes = useSelector(({ownerMaintainanceTypesReducer} : OwnerMaintainanceTypesReducerProps) => ownerMaintainanceTypesReducer).ownerMaintainanceTypes

    const dispatch = useDispatch()
    const router = useRouter()

    const title = initialData ? 'Edit Request' : 'Create Request'
    const action = initialData ? 'Save Changes' : 'Create'
    const description = initialData ? "Edit maintaince request info" : "Add a new maintainance request"
    const toastMessage = initialData ? "Request info updated" : "New request created"



    const [loading, setLoading] = useState(false)
    const form = useForm<MaintainanceRequestFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData ? {
            type : initialData.type ? initialData.type._id : '',
            details : initialData.details,
            attachment : initialData.attachment
        } 
        :
        {
            type : '',
            details : '',
            attachment : ''
        }
    })

    
    const onSubmit = async (data : MaintainanceRequestFormValues) => {
        if ( initialData ) {
                   const formData = {
                    ...data,
                    _id : initialData._id, 
                    requestNo : initialData.requestNo
                }
                   const result = await api.patch(`updateRequest`,formData)
                   dispatch(updateTenantMaintainanceRequest(result.data))
                   toast.success(toastMessage)
                   router.push('/tenant_requests')
                }
           else {
            const formData = {
                ...data, 
                owner : tenant.owner._id,
                property : tenant.property._id,
                unit : tenant.unit._id,
                requestNo : `CW${Math.round(new Date().getTime()*Math.random()/1000000)}`,
                status : "Incomplete",
                paymentStatus : "Due"
            }
            const result = await api.post(`createRequest`, formData)
            dispatch(addTenantMaintainanceRequest(result.data.newRequest))
            dispatch(addNotification(result.data.newNotification))
            toast.success(toastMessage)
            router.push('/tenant_requests')
           }
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
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type <span className='text-red-500'>*</span></FormLabel>
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
                                                        placeholder="Select Type"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {maintainanceTypes.map(({_id,type})=>(
                                                        <SelectItem key={_id}  value={_id} >
                                                            {type}
                                                        </SelectItem> 
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="details"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input type='text' disabled={loading} placeholder='blah blah blash...' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="attachment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Attachment</FormLabel>
                                    <FormControl>
                                        <PdfUpload
                                                buttonName='Add Attachment'
                                                value={field.value ? [field.value] : []}
                                                onChange={(url)=>field.onChange(url)}
                                                onRemove={()=>field.onChange("")}
                                            />
                                        </FormControl>
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