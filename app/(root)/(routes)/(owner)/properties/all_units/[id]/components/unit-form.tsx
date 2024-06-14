"use client"

import { PropertiesReducerProps, PropertyProps, MaintainerProps, UnitProps, UnitsReducerProps, TenantsReducerProps } from "@/types"

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
import './unit-form.css'
import ImageUpload from "@/components/image-upload"
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import { useDispatch, useSelector } from "react-redux"
import { Textarea } from "@/components/ui/textarea"
import { updateUnit } from "@/redux/units/unitsSlice"
import { useRouter } from "next/navigation"
import api from "@/actions/api"
import { updateOwnerUnit } from "@/redux/data/owner/unitsSlice"


type UnitFormValues = z.infer<typeof formSchema>

interface UnitFormProps {
    initialData: UnitProps
}

const formSchema = z.object({
    tenantId : z.string(),
    image : z.string().min(1, {message : "Image Required"}),
    name : z.string().min(1, {message : "Name Required"}),
    condition : z.string().min(1, {message : "Condition Required"}),
    squareFeet : z.coerce.number().min(1),
    bedrooms : z.coerce.number().min(1),
    washrooms : z.coerce.number().min(1),
    kitchen : z.coerce.number().min(1),
    description : z.string().min(1, {message : "Description Required"})
})



// propertyId : string,
// unitId : string,



export const UnitForm : React.FC<UnitFormProps> = ({
    initialData
}) => {

    const propertyName = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer).properties.filter(({_id}) => _id === initialData.property._id)[0].name
    const {tenants} = useSelector(({tenantsReducer} : TenantsReducerProps) => tenantsReducer)
    const dispatch = useDispatch()
    const router = useRouter()

    const title =  `Edit Unit`
    const action = initialData ? 'Save Changes' : 'Create'
    const description = `${propertyName}/${initialData.name}`
    const toastMessage = initialData ? "Maintainer info updated" : "New maintainer created"


    const [loading, setLoading] = useState(false)
    const form = useForm<UnitFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData || {
            tenantId : ''
        }
    })

    
    const onSubmit = async (data : UnitFormValues) => {

       
        const result = await api.patch(`updateUnit`,data,{validateStatus: () => true})
        if (result.status === 200) {
            dispatch(updateOwnerUnit(result.data))
            toast.success('Unit updated.')
        } else {
            toast.error("something went wrong")
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
                            name={`image`}
                            render={({ field }) => (
                                <FormItem className=''>
                                    <FormLabel className=''>Upload Image <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl className=''>
                                        <ImageUpload
                                            buttonName='Upload an Image'
                                            value={field.value ? [field.value] : []}
                                            onChange={(url)=>field.onChange(url)}
                                            onRemove={()=>field.onChange("")}
                                        />
                                    </FormControl>
                                    
                                </FormItem>
                            )}
                        />
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
                            name="condition"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Condition <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input  type='text' disabled={loading} placeholder='Good' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> 
                        <FormField
                            control={form.control}
                            name="squareFeet"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Square Feets <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input type='number' disabled={loading} placeholder='200' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bedrooms"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bedrooms <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input type='number' disabled={loading} placeholder='3' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="washrooms"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Washrooms <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input  type='number' disabled={loading} placeholder='2' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="kitchen"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kitchen <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input  type='number' disabled={loading} placeholder='1' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> 
                         <FormField
                                control={form.control}
                                name="tenantId"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Unit</FormLabel>
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
                                                        placeholder="Select Tenant"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    tenants.map(({name,_id}) =>
                                                        <SelectItem value={_id} key={_id} >
                                                            {name}
                                                        </SelectItem>
                                                    )
                                                }    
                                            </SelectContent>
                                        </Select>
                                    
                                </FormItem> 
                                )}
                            />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="col-span-3">
                                    <FormLabel>Description <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Textarea rows={4} disabled={loading} placeholder='1' {...field} />
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