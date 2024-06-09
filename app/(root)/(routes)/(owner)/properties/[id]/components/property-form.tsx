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
import { OwnerInfoReducerProps, PackageProps, PropertyProps, UnitProps } from '@/types'
import Pathname from '@/components/pathname'
import { Checkbox } from '@/components/ui/checkbox'
import './property-form.css'
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
import { useRouter } from 'next/navigation'
import { addProperty, updateProperty } from '@/redux/properties/propertiesSlice'
import { addUnit, removeUnit } from '@/redux/units/unitsSlice'
import api from '@/actions/api'
import { updateOwner } from '@/redux/owners/ownersSlice'
import { updateOwnerInfo } from '@/redux/info/ownerInfoSlice'


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
            postCode : string,
            owner : string
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

interface FormProps {
    formsReducer : {
        propertyForm : {
            initialData1: {
                propertyName: string,
                unitCount: 1,
                description: string,
                image: string,
                address: string,
                city: string,
                state: string,
                country: string,
                postCode: string
              },
              initialData2: [
                {
                  name: string,
                  bedrooms: number,
                  washrooms: number,
                  kitchens: number,
                  squareFeet: number,
                  condition: string,
                  image: string,
                  description: string
                }
              ],
              initialData3: { rent: number, deposit: number, lateFee: number, rentType: string } 
        } 
    }
}

const form1Schema = z.object({
    propertyName : z.string().min(1, {message : "Label Required"}),
    unitCount : z.coerce.number().min(1, {message : "Unit Required"}),
    description : z.string().min(1, {message : "Description Required"}),
    image : z.string().min(1, {message : "Image Required"}),
    address : z.string().min(1, {message : "Address Required"}),
    city : z.string().min(1, {message : "City Required"}),
    state : z.string().min(1, {message : "State Required"}),
    country : z.string().min(1, {message : "Country Required"}),
    postCode : z.string().min(1, {message : "Postal Code Required"})
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
        description : z.string()
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

    const {propertyForm} = useSelector(({formsReducer} : FormProps) => formsReducer)
    const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo
    const dispatch = useDispatch()
    const router = useRouter()

    const [form, setForm] = useState(0)

    const title = initialData ? 'Edit Property' : 'Add Property'
    const action = initialData ? 'Save Changes' : 'Add Property'
    const description = initialData ? "Edit a property" : "Create a new property"
    const toastMessage = initialData ? "Property updated." : "New property added."
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
            kitchens : item.kitchens,
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
        if (owner.activePackage) {
            if (initialData) {
                if ((data.unitCount + owner.unitCount - initialData.initialData1.unitCount) <= owner.activePackage.maxUnit) {
                    dispatch(addPropertyData1(data))
                    setForm(1)
                } else {
                    toast.error(`You can add ${owner.activePackage.maxUnit + initialData.initialData1.unitCount - owner.unitCount} units or less`)
                    form1.setError("unitCount", {type : 'required', message : 'Max unit limit reached.'})
                }
            } else {
                if ((data.unitCount + owner.unitCount) <= owner.activePackage.maxUnit) {
                    dispatch(addPropertyData1(data))
                    setForm(1)
                } else {
                    toast.error(`You can add ${owner.activePackage.maxUnit - owner.unitCount} units or less`)
                    form1.setError("unitCount", {type : 'required', message : 'Max unit limit reached.'})
                }
            }
        }
        

            
    }

    const onForm2Submit = async (formData : PropertyForm2Values) => {

        dispatch(addPropertyData2(formData.units))
        setForm(2)
    }

    const onForm3Submit = async (formData : PropertyForm3Values) => {
     
        dispatch(addPropertyData3(formData))

        if (initialData) {
            // update
            const updatePropertyData = {
                _id : initialData.initialData1._id,
                name : propertyForm.initialData1.propertyName,
                coverImage : propertyForm.initialData1.image,
                description : propertyForm.initialData1.description,
                unitCount : propertyForm.initialData1.unitCount,
                address : propertyForm.initialData1.address,
                city : propertyForm.initialData1.city,
                state : propertyForm.initialData1.state,
                country : propertyForm.initialData1.country,
                postCode : propertyForm.initialData1.postCode,
                deposit : formData.deposit,
                lateFee : formData.lateFee,
                rent : formData.rent,
                rentType : formData.rentType,
                owner : initialData.initialData1.owner
            }

            const {data,status} = await api.patch(`updateProperty`,updatePropertyData,{validateStatus: () => true})
            dispatch(updateProperty(updatePropertyData))

            initialData.initialData2.map(async (item) => {
                await api.delete(`deleteUnit?id=${item._id}`,{validateStatus: () => true})
            })
            propertyForm.initialData2.map(async (item) => {
                const newUnit = {...item,property : data._id}
                const result = await api.post(`addUnit`,newUnit,{validateStatus: () => true})
                dispatch(addUnit(result.data))
                return result.data
            })

            if(initialData.initialData1.unitCount !== propertyForm.initialData1.unitCount) {
                const update = {    
                    _id : owner._id,
                    user : owner.user,
                    status : owner.status,
                    propertyCount : owner.propertyCount,
                    unitCount : owner.unitCount - initialData.initialData1.unitCount + propertyForm.initialData1.unitCount,
                    activePackage : owner.activePackage
                }
                const result = await api.patch(`updateOwner`,update,{validateStatus: () => true})
                dispatch(updateOwner(result.data))
                dispatch(updateOwnerInfo(update))
            }
        } 
        
        else {
            // add
            const newPropertyData = {
                name : propertyForm.initialData1.propertyName,
                coverImage : propertyForm.initialData1.image,
                description : propertyForm.initialData1.description,
                unitCount : propertyForm.initialData1.unitCount,
                address : propertyForm.initialData1.address,
                city : propertyForm.initialData1.city,
                state : propertyForm.initialData1.state,
                country : propertyForm.initialData1.country,
                postCode : propertyForm.initialData1.postCode,
                deposit : formData.deposit,
                lateFee : formData.lateFee,
                rent : formData.rent,
                rentType : formData.rentType,
                owner : owner._id
            }
            
            const {data,status} = await api.post(`addProperty`,newPropertyData,{validateStatus: () => true})
            dispatch(addProperty(data))

            propertyForm.initialData2.map(async (item) => {
                const newUnit = {...item,property : data._id}
                const result = await api.post(`addUnit`,newUnit,{validateStatus: () => true})
                dispatch(addUnit(result.data))
                return result.data
            })

            const update = {    
                _id : owner._id,
                user : owner.user,
                status : owner.status,
                propertyCount : owner.propertyCount + 1,
                unitCount : owner.unitCount + propertyForm.initialData1.unitCount,
                activePackage : owner.activePackage
            }
            const result = await api.patch(`updateOwner`,update,{validateStatus: () => true})
            dispatch(updateOwner(result.data))
            dispatch(updateOwnerInfo(update))
        }

        toast.success(toastMessage)
        router.push('/properties/all_properties')
        setForm(0)
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
                                            <FormLabel className=''>Cover Image <span className='text-red-500'>*</span></FormLabel>
                                            <FormControl className=''>
                                                <ImageUpload
                                                    buttonName='Upload an image'
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

                            
                        </div>
                        <div className='flex justify-end'>
                            <Button className='bg-purple-600' disabled={loading} type='submit'>
                                Save & Next
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
                        <Button className='bg-purple-600' disabled={loading}  onClick={()=>(setForm(0))}>
                            Back
                        </Button>
                        <Button className='bg-purple-600' disabled={loading}  type='submit'>
                            Save & Next
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
                        <Button className='bg-purple-600' disabled={loading}  onClick={()=>(setForm(1))}>
                            Back
                        </Button>
                        <Button className='bg-purple-600' disabled={loading}  type='submit'>
                            {action}
                        </Button>
                        </div>
                    </form>
                </Form> 
            }

            
        </div>
    )
}