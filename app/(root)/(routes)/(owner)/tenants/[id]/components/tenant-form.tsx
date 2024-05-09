"use client"

import { PropertiesReducerProps, PropertyProps, TenantProps, UnitProps, UnitsReducerProps } from "@/types"

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
import './tenant-form.css'
import ImageUpload from "@/components/image-upload"
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import { useSelector } from "react-redux"


type TenantFormValues = z.infer<typeof formSchema>

interface TenantFormProps {
    initialData: TenantProps
}

const formSchema = z.object({
    image: z.string(),
    propertyId : z.string().min(1, {message : "Name Required"}),
    unitId : z.string().min(1, {message : "Name Required"}),
    name : z.string().min(1, {message : "Name Required"}),
    email : z.string().min(1, {message : "Name Required"}),
    phone : z.string().min(1, {message : "Name Required"}),
    NID : z.number().min(8),
    age : z.number().min(1),
    occupation : z.string().min(1),
    familyMember : z.number().min(1),
    due : z.coerce.number().min(1),
    startDate : z.string(),    
    status : z.boolean().default(false)
})


// propertyId : string,
// unitId : string,



export const TenantForm : React.FC<TenantFormProps> = ({
    initialData
}) => {
    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)

    const [propertyId,setPropertyId] = useState('')
    const [thisUnits,setThisUnits] = useState<UnitProps[]>()
    const [update,setUpdate] = useState(false)


    const selectUnits = ( id : string) => {
        console.log(id,thisUnits)
    }

   

    useEffect(()=>{
        // const temp = units.filter((item)=> item.propertyId === propertyId)
        // setThisUnits(temp)

    },[propertyId])

    const title = initialData ? 'Edit Tenant' : 'Create Tenant'
    const action = initialData ? 'Save Changes' : 'Create'
    const description = initialData ? "Edit tenant info" : "Add a new tenant"
    const toastMessage = initialData ? "Tenant info updated" : "New tenant created"


 






    const [loading, setLoading] = useState(false)
    const form = useForm<TenantFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData || {
            image: '',
            propertyId :'',
            unitId :'',
            name :'',
            email :'',
            phone :'',
            NID : 0,
            age : 0,
            occupation : '',
            familyMember :0,
            due :0,
            startDate : '',
            status : true,
        }
    })

    const onSubmit = async (data : TenantFormValues) => {
        console.log(data)
        try {
            setLoading(true)
                const updatePackage = {
                 
                }
                
        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false)
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
        <div className='add'>
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
                            name="image"
                            render={({ field }) => (
                                <FormItem className='lg:col-span-3 md:col-span-2'>
                                    
                                    {/* <FormLabel className=''>Upload an Image</FormLabel> */}
                                    <FormControl className=''>
                                        <ImageUpload
                                            buttonName='Upload an Image'
                                            value={field.value ? [field.value] : []}
                                            onChange={(url)=>field.onChange(url)}
                                            onRemove={()=>field.onChange("")}
                                        />
                                    </FormControl>
                                    <FormMessage />
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
                            name="phone"
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
                            name="NID"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>NID No <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input type='number' disabled={loading} placeholder='5345634644' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="propertyId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Property <span className='text-red-500'>*</span></FormLabel>
                                    <Select
                                            disabled={loading} 
                                            onValueChange={field.onChange} 
                                            value={field.value}
                                            defaultValue={field.value}
                                            
                                        >
                                            <FormControl >
                                                <SelectTrigger>
                                                    <SelectValue 
                                                        defaultValue={field.value}
                                                        placeholder="Select Property"
                                                    
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {properties.map(({_id, name} : PropertyProps,index)=>(
                                                    <SelectItem   key={index} value={_id} >
                                                        {name}
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
                            name="unitId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Unit <span className='text-red-500'>*</span></FormLabel>
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
                                                        placeholder="Select Unit"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    units
                                                    ? units.map(({_id, name} : UnitProps,index)=>(
                                                        <SelectItem key={index} value={_id} >
                                                            {name}
                                                        </SelectItem>
                                                    ))
                                                    :
                                                    <SelectItem value="">
                                                            Select Property
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
                            name="age"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Age in Years<span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input type='number' disabled={loading} placeholder='25' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="occupation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Occupation <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input type='text' disabled={loading} placeholder='Teacher' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="familyMember"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Family Members <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input type='number' disabled={loading} placeholder='2' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="due"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Due (in dollers)<span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input type='number' disabled={loading} placeholder='20' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start Date <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input type='date' disabled={loading} placeholder='' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className='flex flex-row rounded-md border p-4 items-start space-x-3 space-y-0'>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className='space-y-1 leading-none'>
                                        <FormLabel>
                                            Active <span className='text-red-500'>*</span>
                                        </FormLabel>
                                        <FormDescription>
                                            This package will be Activated.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        
                    </div>
                    <Button disabled={loading} className='ml-auto' type='submit'>
                        {action}
                    </Button>
                </form>
            </Form> 
        </div>
    )
}