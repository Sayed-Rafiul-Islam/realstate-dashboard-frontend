"use client"

import { PropertiesReducerProps, PropertyProps, MaintainerProps, UnitProps, UnitsReducerProps, MaintainanceTypesReducerProps, MaintainanceTypeProps, OwnerInfoReducerProps, OwnerMaintainanceTypesReducerProps } from "@/types"

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
import { Checkbox } from '@/components/ui/checkbox'
import './maintainer-form.css'
import ImageUpload from "@/components/image-upload"
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { addMaintainer, updateMaintainer } from "@/redux/maintainers/maintainersSlice"
import api from "@/actions/api"
import { addOwnerMaintainer } from "@/redux/data/owner/maintainersSlice"


type MaintainerFormValues = z.infer<typeof formSchema>

interface MaintainerFormProps {
    initialData: MaintainerProps
}

const formSchema = z.object({

    name : z.string().min(1, {message : "Name Required"}),
    contactNo : z.string().min(1, {message : "Contact No Required"}),
    email : z.string().min(1, {message : "Email Required"}),
    password : z.string().min(8, {message : "Password Required"}),
    type : z.string().min(1, {message : "Maintainer Type Required"}),
})



// propertyId : string,
// unitId : string,



export const MaintainerForm : React.FC<MaintainerFormProps> = ({
    initialData
}) => {

    const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo
    const {ownerMaintainanceTypes} = useSelector(({ownerMaintainanceTypesReducer} : OwnerMaintainanceTypesReducerProps) => ownerMaintainanceTypesReducer)
    const dispatch = useDispatch()
    const router = useRouter()
    
    const title = initialData ? 'Edit Maintainer' : 'Create Maintainer'
    const action = initialData ? 'Save Changes' : 'Create'
    const description = initialData ? "Edit maintainer info" : "Add a new maintainer"
    const toastMessage = initialData ? "Maintainer info updated" : "New maintainer created"

    const [loading, setLoading] = useState(false)
    const form = useForm<MaintainerFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData || {
            name : '',
            contactNo : '',
            email : '',
            password : '',
            type : '',
        }
    })

    const onSubmit = async (data : MaintainerFormValues) => {

        if (initialData) {
            
            // const formData = {...data, _id : initialData._id,owner : owner._id}
            // const result = await api.patch(`updateMaintainanceType`,formData,{validateStatus: () => true})
            // if (result.status === 200) {
                // dispatch(updateMaintainanceType(result.data))
            //     toast.success(toastMessage)
            //     router.push('/maintainers')
            // } else {
            //     toast.error("Something went wrong")
            // }
        } else {
            const formData = {...data, owner : owner._id}
            const result = await api.post(`createMaintainer`,formData,{validateStatus: () => true})
            if (result.status === 200) {
                dispatch(addOwnerMaintainer(result.data))
                toast.success(toastMessage)
                router.push('/maintainers')
            } else if (result.status === 400) {
                toast.error("Email already in use")
            }
            else {
                toast.error("Something went wrong")
            }
            
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='John Doe' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                
                        <FormField
                            control={form.control}
                            name="contactNo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact No <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input type='text' disabled={loading} placeholder='+88016********' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                          <FormField
                                    control={form.control}
                                    name="type"
                                    render={(item) => (
                                        <FormItem>
                                            <FormLabel>Type<span className='text-red-500'>*</span></FormLabel>
                                            <Select
                                                    disabled={loading} 
                                                    onValueChange={e=> item.field.onChange(e)}
                                                    value={item.field.value}
                                                    defaultValue={item.field.value}
                                                    
                                                    
                                                >
                                                    <FormControl >
                                                        <SelectTrigger>
                                                            <SelectValue 
                                                                defaultValue={item.field.value}
                                                                placeholder="Select Type"
                                                            
                                                            />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent  >
                                                        {ownerMaintainanceTypes.map(({_id, maintainer} : MaintainanceTypeProps,index)=>(
                                                            <SelectItem key={_id} value={_id} >
                                                                {maintainer}
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input type='text' disabled={loading} placeholder='example@gmail.com' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input  type='password' disabled={loading} placeholder='********' {...field} />
                                    </FormControl>
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