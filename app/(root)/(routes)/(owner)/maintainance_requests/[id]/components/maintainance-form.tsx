"use client"

import { PropertiesReducerProps, PropertyProps, UnitProps, UnitsReducerProps, MaintainanceRequestProps, MaintainanceRequestsReducerProps, MaintainanceTypesReducerProps } from "@/types"

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/heading"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
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
import api from "@/actions/api"
import { useRouter } from "next/navigation"
import { addMaintainanceRequest, updateMaintainanceRequest } from "@/redux/maintainanceRequests/maintainanceRequestsSlice"
import PdfUpload from "@/components/pdf-upload"
import { addNotification } from "@/redux/report/notificationsSlice"


type MaintainanceRequestFormValues = z.infer<typeof formSchema>

interface MaintainanceRequestFormProps {
    initialData: MaintainanceRequestProps
}

const formSchema = z.object({

    propertyId : z.string().min(1, {message : "Property Name Required"}),
    unitId : z.string().min(1, {message : "Unit Name Required"}),
    type : z.string().min(1, {message : "Maintainer Type Required"}),
    status : z.string().min(1, {message : "Status Required"}),
    details : z.string().min(1, {message : "Description Required"}),
    attachment : z.string(),

})

export const MaintainanceRequestForm : React.FC<MaintainanceRequestFormProps> = ({
    initialData
}) => {


    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)
    const {maintainanceTypes} = useSelector(({maintainanceTypesReducer} : MaintainanceTypesReducerProps) => maintainanceTypesReducer)

    const [propertyId,setPropertyId] = useState(initialData ? initialData.propertyId : '')
    const dispatch = useDispatch()

    const [thisUnits,setThisUnits] = useState<UnitProps[]>()
    const router = useRouter()

    useEffect(()=>{
        const temp = units.filter((item)=> item.property._id === propertyId)
        setThisUnits(temp)
        form.setValue('unitId', '')       

    },[propertyId])


    const title = initialData ? 'Edit Request' : 'Create Request'
    const action = initialData ? 'Save Changes' : 'Create'
    const description = initialData ? "Edit maintaince request info" : "Add a new maintainance request"
    const toastMessage = initialData ? "Request info updated" : "New request created"



    const [loading, setLoading] = useState(false)
    const form = useForm<MaintainanceRequestFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData || {
            propertyId : '',
            unitId : '',
            type : '',
            status : '',
            details : '',
            attachment : ''
        }
    })

    
    const onSubmit = async (data : MaintainanceRequestFormValues) => {
        if ( initialData ) {
                   const formData = {...data,_id : initialData._id, requestNo : initialData.requestNo}
                   const result = await api.post(`updateRequest`, 
                   formData,
                   {
                       headers : { 'Content-Type' : 'multipart/form-data'}
                   })
                   dispatch(updateMaintainanceRequest(result.data))
                   toast.success(toastMessage)
                   router.push('/maintainance_requests')
                }
           else {
            const formData = {...data, requestNo : `CW${Math.round(new Date().getTime()*Math.random()/1000000)}`}
            const result = await api.post(`createRequest`, formData)
            dispatch(addMaintainanceRequest(result.data.newRequest))
            dispatch(addNotification(result.data.newNotification))
            toast.success(toastMessage)
            router.push('/maintainance_requests')
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
                            name="propertyId"
                            render={(item) => (
                                <FormItem>
                                    <FormLabel>Property <span className='text-red-500'>*</span></FormLabel>
                                    <Select
                                            disabled={loading} 
                                            onValueChange={e=> {
                                                setPropertyId(e)
                                                item.formState.validatingFields.unitId
                                                
                                                return item.field.onChange(e)
                                            }}
                                            value={item.field.value}
                                            defaultValue={item.field.value}
                                            
                                            
                                        >
                                            <FormControl >
                                                <SelectTrigger>
                                                    <SelectValue 
                                                        defaultValue={item.field.value}
                                                        placeholder="Select Property"
                                                    
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent  >
                                                {properties.map(({_id, name} : PropertyProps,index)=>(
                                                    <div key={_id}>
                                                    <SelectItem key={index} value={_id} >
                                                        {name}
                                                    </SelectItem>
                                                    </div>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />  
                         
                            
                        <FormField
                            control={form.control}
                            name="unitId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Unit <span className='text-red-500'>*</span></FormLabel>
                                    <Select 
                                            disabled={loading} 
                                            onValueChange={field.onChange}
                                            value={thisUnits?.length === 0 ? '' : field.value}
                                            defaultValue={thisUnits?.length === 0 ? '' : field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue 
                                                        defaultValue={field.value}
                                                        placeholder="Select Unit"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    thisUnits
                                                    ? thisUnits.map(({_id, name} : UnitProps,index)=>(
                                                        <SelectItem key={index} value={_id} >
                                                            {name}
                                                        </SelectItem>
                                                    ))
                                                    :
                                                    <SelectItem value="">
                                                            Select Unit
                                                    </SelectItem>
                                                }
                                            </SelectContent>
                                        </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         
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
                                                    <div key={_id}>
                                                        <SelectItem  value={_id} >
                                                            {type}
                                                        </SelectItem>
                                                    </div>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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