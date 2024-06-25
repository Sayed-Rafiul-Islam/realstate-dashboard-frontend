"use client"

import { MaintainerProps, MaintainanceTypeProps, OwnerInfoReducerProps, OwnerMaintainanceTypesReducerProps, OwnerPropertyReducerProps, PropertyProps } from "@/types"

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
import './maintainer-form.css'
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import api from "@/actions/api"
import { addOwnerMaintainer, updateOwnerMaintainer } from "@/redux/data/owner/maintainersSlice"


type MaintainerFormValues = z.infer<typeof formSchema>

interface MaintainerFormProps {
    initialData: MaintainerProps
}

const formSchema = z.object({

    name : z.string().min(1, {message : "Name Required"}),
    contactNo : z.string().min(1, {message : "Contact No Required"}),
    email : z.string().min(1, {message : "Email Required"}),
    password : z.string().min(6, {message : "Password Required"}),
    type : z.string().min(1, {message : "Maintainer Type Required"}),
    property : z.string().min(1, {message : "Maintainer Type Required"}),
})

export const MaintainerForm : React.FC<MaintainerFormProps> = ({
    initialData
}) => {

    const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo
    const {ownerMaintainanceTypes} = useSelector(({ownerMaintainanceTypesReducer} : OwnerMaintainanceTypesReducerProps) => ownerMaintainanceTypesReducer)
    const properties = useSelector(({ownerPropertyReducer} : OwnerPropertyReducerProps) => ownerPropertyReducer).ownerProperties
    const dispatch = useDispatch()
    const router = useRouter()
    
    // const [propertyId,setPropertyId] = useState(initialData ? initialData.property._id : '')

    const title = initialData ? 'Edit Maintainer' : 'Create Maintainer'
    const action = initialData ? 'Save Changes' : 'Create'
    const description = initialData ? "Edit maintainer info" : "Add a new maintainer"
    const toastMessage = initialData ? "Maintainer info updated" : "New maintainer created"

    const [loading, setLoading] = useState(false)
    const form = useForm<MaintainerFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : 
        initialData ? 
        {
            property : initialData.property ? initialData.property._id : '',
            name : initialData && initialData.name,
            contactNo : initialData.user ? initialData.user.contactNo : '',
            type : initialData.type ? initialData.type._id : '',
            email : initialData && "g32uige32ge23iue",
            password : initialData && 'e78g8f3g8w4gfw48f'

        }
        :
        {
            property : '',
            name : '',
            contactNo : '',
            type : ''
        }
    })

    const onSubmit = async (data : MaintainerFormValues) => {

        if (initialData) {
            const {email,password,...rest} = data
            const formData = {...rest, _id : initialData._id}
            const result = await api.patch(`updateMaintainer`,formData,{validateStatus: () => true})
            if (result.status === 200) {
                dispatch(updateOwnerMaintainer(result.data))
                toast.success(toastMessage)
                router.push('/maintainers')
            } else {
                toast.error("Something went wrong")
            }
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
                            {
                                !initialData &&
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
                            }
                            {
                                !initialData &&
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
                            }
                            <FormField
                                    control={form.control}
                                    name="property"
                                    render={(item) => (
                                        <FormItem>
                                            <FormLabel>Assign Property<span className='text-red-500'>*</span></FormLabel>
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
                                                                placeholder="Select Property"
                                                            
                                                            />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent  >
                                                        {properties.map(({_id, name} : PropertyProps,index)=>(
                                                            <SelectItem key={_id} value={_id} >
                                                                {name}
                                                            </SelectItem>
                                                        ))}
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