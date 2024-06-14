"use client"

import { PropertiesReducerProps, PropertyProps, UnitProps, UnitsReducerProps, MaintainanceRequestProps, MaintainanceRequestsReducerProps, MaintainanceTypesReducerProps, OwnerPropertyReducerProps, OwnerUnitsReducerProps, OwnerMaintainanceTypesReducerProps, OwnerInfoReducerProps, MaintainerProps, OwnerMaintainersReducerProps } from "@/types"

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
import { addOwnerMaintainanceRequest, updateOwnerMaintainanceRequest } from "@/redux/data/owner/maintainanceRequestsSlice"


type MaintainanceRequestFormValues = z.infer<typeof formSchema>

interface MaintainanceRequestFormProps {
    initialData: MaintainanceRequestProps
}

const formSchema = z.object({

    property : z.string().min(1, {message : "Property Name Required"}),
    unit : z.string().min(1, {message : "Unit Name Required"}),
    maintainer : z.string().min(1, {message : "Maintainer Required"}),
    type : z.string().min(1, {message : "Maintainer Type Required"}),
    // status : z.string().min(1, {message : "Status Required"}),
    details : z.string().min(1, {message : "Description Required"}),
    attachment : z.string(),

})

export const MaintainanceRequestForm : React.FC<MaintainanceRequestFormProps> = ({
    initialData
}) => {


    const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo
    const properties = useSelector(({ownerPropertyReducer} : OwnerPropertyReducerProps) => ownerPropertyReducer).ownerProperties
    const units = useSelector(({ownerUnitsReducer} : OwnerUnitsReducerProps) => ownerUnitsReducer).ownerUnits
    const maintainanceTypes = useSelector(({ownerMaintainanceTypesReducer} : OwnerMaintainanceTypesReducerProps) => ownerMaintainanceTypesReducer).ownerMaintainanceTypes
    const maintainers = useSelector(({ownerMaintainersReducer} : OwnerMaintainersReducerProps) => ownerMaintainersReducer).ownerMaintainers

    const [propertyId,setPropertyId] = useState(initialData ? initialData.property._id : '')
    const [typeId,setTypeId] = useState(initialData ? initialData.type._id : '')
    const dispatch = useDispatch()

    const [thisUnits,setThisUnits] = useState<UnitProps[]>()
    const [thisMaintainers,setThisMaintainer] = useState<MaintainerProps[]>()
    const router = useRouter()

    useEffect(()=>{
        const temp = units.filter((item)=> item.property._id === propertyId)
        setThisUnits(temp)
        if (initialData?.unit) {
            form.setValue('unit', initialData.unit._id)  
        } else {
            form.setValue('unit', '')  
        }
             
    },[propertyId])

    useEffect(()=>{
        const temp = maintainers.filter((item)=> item.type._id === typeId && item.property._id === propertyId)
        console.log(temp)
        setThisMaintainer(temp)
        if (initialData?.maintainer) {
            form.setValue('maintainer', initialData.maintainer._id)  
        } else {
            form.setValue('maintainer', '')  
        }
             
    },[typeId,propertyId])


    const title = initialData ? 'Edit Request' : 'Create Request'
    const action = initialData ? 'Save Changes' : 'Create'
    const description = initialData ? "Edit maintaince request info" : "Add a new maintainance request"
    const toastMessage = initialData ? "Request info updated" : "New request created"



    const [loading, setLoading] = useState(false)
    const form = useForm<MaintainanceRequestFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            property : initialData?.property ? initialData.property._id : '',
            unit :  initialData?.unit ? initialData.unit._id : '', 
            type :  initialData?.type ? initialData.type._id : '',
            maintainer :  initialData?.maintainer ? initialData.maintainer._id : '',
            // status : initialData && initialData.status,
            details : initialData && initialData.details,
            attachment : initialData && initialData.attachment
        }
    })

    
    const onSubmit = async (data : MaintainanceRequestFormValues) => {
        if ( initialData ) {
                   const formData = {
                    ...data,
                    _id : initialData._id, 
                    requestNo : initialData.requestNo
                }
                   const result = await api.patch(`updateRequest`, formData ,{validateStatus: () => true})
                   dispatch(updateOwnerMaintainanceRequest(result.data))
                   toast.success(toastMessage)
                   router.push('/maintainance_requests')
                }
           else {
            const formData = {
                ...data, 
                owner : owner._id,
                requestNo : `CW${Math.round(new Date().getTime()*Math.random()/1000000)}`,
                paymentStatus : "Due",
                status : "Incomplete"
            }
           
            const result = await api.post(`createRequest`, formData,{validateStatus: () => true})
            dispatch(addOwnerMaintainanceRequest(result.data.newRequest))
            // dispatch(addNotification(result.data.newNotification))
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
                            name="property"
                            render={(item) => (
                                <FormItem>
                                    <FormLabel>Property <span className='text-red-500'>*</span></FormLabel>
                                    <Select
                                            disabled={loading} 
                                            onValueChange={e=> {
                                                setPropertyId(e)
                                                item.formState.validatingFields.unit
                                                
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
                            name="unit"
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
                            render={(item) => (
                                <FormItem>
                                    <FormLabel>Type <span className='text-red-500'>*</span></FormLabel>
                                    <Select 
                                            disabled={propertyId === '' ? true : false}
                                            onValueChange={e=> {
                                                setTypeId(e)
                                                item.formState.validatingFields.maintainer
                                                
                                                return item.field.onChange(e)
                                            }}
                                            value={item.field.value}
                                            defaultValue={item.field.value}
                                        >
                                            <FormControl>                            
                                                <SelectTrigger>
                                                    <SelectValue 
                                                        defaultValue={item.field.value}
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
                            name="maintainer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Maintainer <span className='text-red-500'>*</span></FormLabel>
                                    <Select 
                                            disabled={propertyId === '' ? true : false}
                                            onValueChange={field.onChange}
                                            value={thisMaintainers?.length === 0 ? '' : field.value}
                                            defaultValue={thisMaintainers?.length === 0 ? '' : field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue 
                                                        defaultValue={field.value}
                                                        placeholder="Select Maintainer"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    thisMaintainers
                                                    ? thisMaintainers.map(({_id, name,user} : MaintainerProps,index)=>{
                                                        console.log(user)
                                                        if (user.firstName === '' && user.lastName === '') {
                                                            return (
                                                                <SelectItem key={index} value={_id} >
                                                                    {name}
                                                                </SelectItem>
                                                            )
                                                        } else {
                                                            return (
                                                                <SelectItem key={index} value={_id} >
                                                                    <span>{user.firstName ? user.firstName + ' ' : ''}{user.lastName && user.lastName}</span>
                                                                </SelectItem>
                                                            )  
                                                        }
                                                    })
                                                    :
                                                    <SelectItem value="">
                                                            Select Maintainer
                                                    </SelectItem>
                                                }
                                            </SelectContent>
                                        </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         {/* <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status <span className='text-red-500'>*</span></FormLabel>
                                    <Select 
                                            disabled={propertyId === '' ? true : false}
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
                        /> */}
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