"use client"

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
import { PackageProps, PropertyProps, UnitProps } from '@/types'
import Pathname from '@/components/pathname'
import { Checkbox } from '@/components/ui/checkbox'
import './package-form.css'
import { StaticImageData } from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { addPropertyData1, addPropertyData2, addPropertyData3 } from '@/redux/forms/formsSlice'

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import { DollarSign, Home, Landmark, School } from 'lucide-react'
import ImageUpload from '@/components/image-upload'


type PropertyForm1Values = z.infer<typeof form1Schema>
type PropertyForm2Values = z.infer<typeof form2Schema>
type PropertyForm3Values = z.infer<typeof form3Schema>


interface PropertyFormProps {
    initialData : {
        initialData1 : {
            _id : string,
            propertyName : string,
            unitCount : number,
            description : string,
            image : string,
            address : string,
            city : string,
            state : string,
            country : string,
            postCode : string
        },
        initialData2 : UnitProps[],
        initialData3 : {
            rent : number,
            deposit : number,
            lateFee : number,
            rentType : string
        }
    } | null
}

const form1Schema = z.object({
    propertyName : z.string().min(1, {message : "Label Required"}),
    unitCount : z.coerce.number().min(1),
    description : z.string().min(1),
    image : z.string().min(1),
    address : z.string().min(1),
    city : z.string().min(1),
    state : z.string().min(1),
    country : z.string().min(1),
    postCode : z.string().min(1)
    // status : z.boolean().default(false),
    // trial : z.boolean().default(false),
})

const form2Schema = z.object({
    units : z.array(z.object({
        name : z.string(),
        bedrooms : z.coerce.number().min(1),
        washrooms : z.coerce.number().min(1),
        kitchens : z.coerce.number().min(1),
        squareFeet : z.coerce.number().min(1),
        condition : z.string(),
        image : z.string(),
        description : z.string(),
    }))
})

const form3Schema = z.object({
    rent : z.coerce.number().min(1),
    deposit : z.coerce.number().min(1),
    lateFee : z.coerce.number().min(1),
    rentType : z.string().min(1)
})


export const PropertyEditForm : React.FC<PropertyFormProps> = ({
    initialData 
}) => {

    const {propertyForm} = useSelector(({formsReducer} : any) => formsReducer)
    const dispatch = useDispatch()

    const [form, setForm] = useState(0)

    const title = initialData ? 'Edit Property' : 'Add Property'
    const action = initialData ? 'Save Changes' : 'Add Property'
    const description = initialData ? "Edit a property" : "Create a new property"
    const toastMessage = initialData ? "Color updated" : "Color created"
    const [loading, setLoading] = useState(false)





    const form1 = useForm<PropertyForm1Values>({
        resolver : zodResolver(form1Schema),
        defaultValues : initialData?.initialData1 || {
            propertyName : '',
            unitCount : 1,
            description : "",
            image : '',
            address : '',
            city : '',
            state : '',
            country : '',
            postCode : ''
        }
    })

    const unitData = initialData 
    ?
    initialData.initialData2.map((item) => ({
            name : item.name,
            bedrooms : item.bedrooms,
            washrooms : item.washrooms,
            kitchens : item.kitchen,
            squareFeet : item.squareFeet,
            condition : item.condition,
            image : item.image,
            description : item.description
    }))
    : []

    const form2 = useForm<PropertyForm2Values>({
        resolver : zodResolver(form2Schema),
        defaultValues : {units : unitData}
    })

    const form3 = useForm<PropertyForm3Values>({
        resolver : zodResolver(form3Schema),
        defaultValues : initialData?.initialData3 || {
            rent : 0,
            deposit : 0,
            lateFee : 0,
            rentType : 'monthly'
        }
    })

    const onForm1Submit = async (data : PropertyForm1Values) => {

        try {
            dispatch(addPropertyData1(data))
            setForm(1)
        } catch (error) {
            console.log('here')
        }

        // try {
        //     setLoading(true)
        //         const updatePackage = {
                 
        //         }
                
        // } catch (error) {
        //     toast.error("Something went wrong.")
        // } finally {
        //     setLoading(false)
        // }
    }

    const onForm2Submit = async (data : PropertyForm2Values) => {
        dispatch(addPropertyData2(data.units))
        setForm(2)
        // try {
        //     setLoading(true)
        //         const updatePackage = {
                 
        //         }
                
        // } catch (error) {
        //     toast.error("Something went wrong.")
        // } finally {
        //     setLoading(false)
        // }
    }

    const onForm3Submit = async (data : PropertyForm3Values) => {
        dispatch(addPropertyData3(data))
        setForm(2)
        // try {
        //     setLoading(true)
        //         const updatePackage = {
                 
        //         }
                
        // } catch (error) {
        //     toast.error("Something went wrong.")
        // } finally {
        //     setLoading(false)
        // }
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

            <div className='flex items-center justify-center mb-10'>
                <button onClick={()=>setForm(0)}>
                    <div className={`flex flex-col items-center gap-2`}>
                        <div className={`${form >= 0 ? 'bg-green-100' : 'bg-gray-300'}  p-2 rounded-full`}>
                            <Landmark className={`${form >= 0 ? 'text-green-500' : 'text-gray-500'}`} size={20} />
                        </div>
                        <h3 className={`text-center text-xs ${form >= 0 ? 'text-black font-semibold' : 'text-gray-500'}`}>Property Informations</h3>
                    </div>
                </button>
                

                <Separator className={`${form > 0 && 'bg-black'} w-1/4 mx-1`} />
                
                <button disabled={form < 1 && true} onClick={()=>setForm(1)}>
                    <div className='flex flex-col items-center gap-2'>
                        <div className={`${form > 0 ? 'bg-orange-100' : 'bg-gray-300'}  p-2 rounded-full`}>
                            <Home className={`${form > 0 ? 'text-orange-500' : 'text-gray-500'}`} size={20} />
                        </div>
                        <h3 className={`text-center text-xs ${form > 0 ? 'text-black font-semibold' : 'text-gray-500'}`}>Unit Informations</h3>
                    </div>
                </button>

                <Separator className={`${form === 2 && 'bg-black'} w-1/4 mx-1`} />

                <button disabled={form < 2 && true} onClick={()=>setForm(2)}>
                    <div className='flex flex-col items-center gap-2'>
                        <div className={`${form === 2 ? 'bg-indigo-100' : 'bg-gray-300'}  p-2 rounded-full`}>
                            <DollarSign className={`${form === 2 ? 'text-indigo-500' : 'text-gray-500'}`} size={20} />
                        </div>
                        <h3 className={`text-center text-xs ${form === 2 ? 'text-black font-semibold' : 'text-gray-500'}`}>Rent & Charges</h3>
                    </div>
                </button>
            </div>


            {
                form === 0 &&
                <Form {...form1}>
                    <form onSubmit={form1.handleSubmit(onForm1Submit)} className='space-y-8 w-full'>
                        <div className='grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1'>
                            <FormField
                                control={form1.control}
                                name="propertyName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Property Name <span className='text-red-500'>*</span></FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder='Te Home' {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form1.control}
                                name="unitCount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Units <span className='text-red-500'>*</span></FormLabel>
                                        <FormControl>
                                            <Input type='number' disabled={loading} placeholder='4' {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                    control={form1.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description <span className='text-red-500'>*</span></FormLabel>
                                            <FormControl>
                                                <Input type='text' disabled={loading} placeholder='blah...' {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form1.control}
                                    name="image"
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
                                control={form1.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address <span className='text-red-500'>*</span></FormLabel>
                                        <FormControl>
                                            <Input type='text' disabled={loading} placeholder='address' {...field} />
                                        </FormControl>
                                        
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form1.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City <span className='text-red-500'>*</span></FormLabel>
                                        <FormControl>
                                            <Input type='text' disabled={loading} placeholder='city' {...field} />
                                        </FormControl>
                                        
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form1.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>State <span className='text-red-500'>*</span></FormLabel>
                                        <FormControl>
                                            <Input type='text' disabled={loading} placeholder='state' {...field} />
                                        </FormControl>
                                        
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form1.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country <span className='text-red-500'>*</span></FormLabel>
                                        <FormControl>
                                            <Input type='text' disabled={loading} placeholder='country' {...field} />
                                        </FormControl>
                                        
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form1.control}
                                name="postCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Post Code <span className='text-red-500'>*</span></FormLabel>
                                        <FormControl>
                                            <Input type='text' disabled={loading} placeholder='post code' {...field} />
                                        </FormControl>
                                        
                                    </FormItem>
                                )}
                            />

                            {/* <FormField
                                control={form1.control}
                                name="trial"
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
                                                On Trial <span className='text-red-500'>*</span>
                                            </FormLabel>
                                            <FormDescription>
                                                This package will be set as trial version.
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            /> */}
                        </div>
                            <div className='flex justify-end'>
                            <Button disabled={loading} type='submit'>
                                Next
                            </Button>
                        </div>
                    </form>
                </Form> 
            }
            {
                form === 1 &&
                <Form {...form2}>
                    <form onSubmit={form2.handleSubmit(onForm2Submit)} className='space-y-8 w-full'>
                        {
                            Array.from({length: propertyForm.initialData1.unitCount}, (v, i) => i).map((_,index)=>
                                <div key={index} className='grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1'>
                                    <h1 className='col-span-3 font-semibold text-xl'>Unit {index + 1}:</h1>
                                    <FormField
                                        control={form2.control}
                                        name={`units.${index}.name`}
                                        render={({field }) => (
                                            <FormItem>
                                                <FormLabel>Unit Name <span className='text-red-500'>*</span></FormLabel>
                                                <FormControl>
                                                    <Input disabled={loading} placeholder='Te Home' {...field} />
                                                </FormControl>
                                                
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form2.control}
                                        name={`units.${index}.bedrooms`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Bedrooms <span className='text-red-500'>*</span></FormLabel>
                                                <FormControl>
                                                    <Input type='number' disabled={loading} placeholder='Te Home' {...field} />
                                                </FormControl>
                                                
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form2.control}
                                        name={`units.${index}.washrooms`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Bathrooms <span className='text-red-500'>*</span></FormLabel>
                                                <FormControl>
                                                    <Input type='number' disabled={loading} placeholder='Te Home' {...field} />
                                                </FormControl>
                                                
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form2.control}
                                        name={`units.${index}.kitchens`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Kitchens <span className='text-red-500'>*</span></FormLabel>
                                                <FormControl>
                                                    <Input type='number' disabled={loading} placeholder='Te Home' {...field} />
                                                </FormControl>
                                                
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form2.control}
                                        name={`units.${index}.squareFeet`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Square Feets <span className='text-red-500'>*</span></FormLabel>
                                                <FormControl>
                                                    <Input type='number' disabled={loading} placeholder='Te Home' {...field} />
                                                </FormControl>
                                                
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form2.control}
                                        name={`units.${index}.condition`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Condition <span className='text-red-500'>*</span></FormLabel>
                                                <FormControl>
                                                    <Input type='text' disabled={loading} placeholder='Te Home' {...field} />
                                                </FormControl>
                                                
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form2.control}
                                        name={`units.${index}.image`}
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
                                    {/* <FormField
                                        control={form2.control}
                                        name={`units.${index}.image`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Image <span className='text-red-500'>*</span></FormLabel>
                                                <FormControl>
                                                    <Input type='text' disabled={loading} placeholder='Te Home' {...field} />
                                                </FormControl>
                                                
                                            </FormItem>
                                        )}
                                    /> */}
                                    <FormField
                                        control={form2.control}
                                        name={`units.${index}.description`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description <span className='text-red-500'>*</span></FormLabel>
                                                <FormControl>
                                                    <Input type='text' disabled={loading} placeholder='Te Home' {...field} />
                                                </FormControl>
                                                
                                            </FormItem>
                                        )}
                                    />
                                <Separator className='mt-10 col-span-3' />
                                </div>
                            )
                        }


                    
                        <div className='flex justify-between'>
                        <Button disabled={loading}  onClick={()=>(setForm(0))}>
                            Back
                        </Button>
                        <Button disabled={loading}  type='submit'>
                            Next
                        </Button>
                        </div>
                    </form>
                </Form> 
            }

            {
                form === 2 &&
                <Form {...form3}>
                      <form onSubmit={form3.handleSubmit(onForm3Submit)} className='space-y-8 w-full'>
                        <div className='grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1'>
                            <FormField
                                control={form3.control}
                                name="rent"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Rent <span className='text-red-500'>*</span></FormLabel>
                                        <FormControl>
                                            <Input type='number' disabled={loading} placeholder='20000' {...field} />
                                        </FormControl>
                                        
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form3.control}
                                name="deposit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Security Deposit <span className='text-red-500'>*</span></FormLabel>
                                        <FormControl>
                                            <Input type='number' disabled={loading} placeholder='5000' {...field} />
                                        </FormControl>
                                        
                                    </FormItem>
                                )}
                            />
                            <FormField
                                    control={form3.control}
                                    name="lateFee"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Late Fee <span className='text-red-500'>*</span></FormLabel>
                                            <FormControl>
                                                <Input type='number' disabled={loading} placeholder='500' {...field} />
                                            </FormControl>
                                            
                                        </FormItem>
                                    )}
                                />
                            <FormField
                                control={form3.control}
                                name="rentType"
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
                                                        <SelectItem value='monthly' >
                                                            Monthly
                                                        </SelectItem>
                                                        <SelectItem value='yearly' >
                                                            Yearly
                                                        </SelectItem>
                                                
                                            </SelectContent>
                                        </Select>
                                    
                                </FormItem> 
                                )}
                            />
                        </div>
                                
         
                        <div className='flex justify-between'>
                        <Button disabled={loading}  onClick={()=>(setForm(1))}>
                            Back
                        </Button>
                        <Button disabled={loading}  type='submit'>
                            {action}
                        </Button>
                        </div>
                    </form>
                </Form> 
            }

            
        </div>
    )
}