"use client"

import { AllUsersReducerProps, OwnerInfoReducerProps, PropertiesReducerProps, PropertyProps, TenantProps, UnitProps, UnitsReducerProps, UsersReducerProps } from "@/types"

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
import { useDispatch, useSelector } from "react-redux"
import { DollarSign, FileText, Home, Landmark, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { addTenantData1, addTenantData2 } from "@/redux/forms/formsSlice"
import { addTenant, updateTenant } from "@/redux/tenants/tenantsSlice"
import PdfUpload from "@/components/pdf-upload"
import api from "@/actions/api"


type TenantForm1Values = z.infer<typeof form1Schema>
type TenantForm2Values = z.infer<typeof form2Schema>
type TenantForm3Values = z.infer<typeof form3Schema>

interface TenantFormProps {
    initialData : {
        initialData1 : {
            _id : string,
            name : string,
            email : string,
            contactNo : string | undefined,
            NID : string | undefined,
            occupation : string,
            age : number,
            familyMembers : number,
            image : string | undefined,
            address : string,
            city : string,
            state : string,
            country : string,
            postCode : string,
            status : boolean
        },
        initialData2 : {
            property : string,
            unit : string,
            startDate : string,
            endDate : string,
            rent : number,
            deposit : number,
            lateFee : number,
            rentType : string,
            due : number,
        },
        initialData3 : {
            propertyDoc : string,
            personalDoc : string,
        }
    } | null
}

interface FormProps {
    formsReducer : {
        tenantForm : {
            initialData1: {
                name : string,
                email : string,
                pass_word : string,
                contactNo : string,
                NID : string,
                occupation : string,
                age : number,
                familyMembers : number,
                image : string,
                address : string,
                city : string,
                state : string,
                country : string,
                postCode : string,
                status : boolean
              },
              initialData2: {
                property : string,
                unit : string,
                startDate : string,
                endDate : string,
                rent : number,
                deposit : number,
                lateFee : number,
                rentType : string,
                due : number,
              },

              initialData3: {
                propertyDoc : string,
                personalDoc : string,
              } 
        } 
    }
}

const form1Schema = z.object({
    name : z.string().min(1, {message : "Name Required"}),
    email : z.string().min(1, {message : "Email Required"}),
    pass_word : z.string().min(1, {message : "Password Required"}),
    contactNo : z.string().min(1, {message : "Contact No Required"}),
    NID : z.string().min(8),
    occupation : z.string(),
    age : z.coerce.number(),
    familyMembers : z.coerce.number(),
    image: z.string().min(1, {message : "Image Required"}),
    address : z.string().min(1, {message : "Address Required"}),
    city : z.string().min(1, {message : "City Required"}),
    state : z.string().min(1, {message : "State Required"}),
    country : z.string().min(1, {message : "Country Required"}),
    postCode : z.string().min(1, {message : "Postal Required"}),
    status : z.boolean().default(false)
})


const form2Schema = z.object({
    property : z.string().min(1, {message : "Property Required"}),
    unit : z.string().min(1, {message : "Unit Required"}),
    startDate : z.string().min(1, {message : "Lease start date required"}),
    endDate : z.string().min(1, {message : "Lease end date required"}),
    due : z.coerce.number(),
})

const form3Schema = z.object({
    propertyDoc : z.string().min(1, {message : 'Property document required.'}),
    personalDoc : z.string().min(1, {message : 'Personal document required.'}),
})


export const TenantForm : React.FC<TenantFormProps> = ({
    initialData
}) => {

    const [form, setForm] = useState(0)
    const dispatch = useDispatch()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    
    const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo
    const {allUsers} = useSelector(({allUsersReducer} : AllUsersReducerProps) => allUsersReducer)
    const {tenantForm} = useSelector(({formsReducer} : FormProps) => formsReducer)
    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)

    const [propertyId,setPropertyId] = useState(initialData ? initialData.initialData2.property : '')
    const [thisUnits,setThisUnits] = useState<UnitProps[]>()
   


    const title = initialData ? 'Edit Tenant' : 'Create Tenant'
    const action = initialData ? 'Save Changes' : 'Create'
    const description = initialData ? "Edit tenant info" : "Add a new tenant"
    const toastMessage = initialData ? "Tenant info updated" : "New tenant created"




    const form1 = useForm<TenantForm1Values>({
        resolver : zodResolver(form1Schema),
        defaultValues : initialData?.initialData1 || {
            age : 0,
            occupation :'',
            familyMembers : 1,
            status : false
        }
    })

    const form2 = useForm<TenantForm2Values>({
        resolver : zodResolver(form2Schema),
        defaultValues : initialData?.initialData2 || {
            due : 0
        }
    })

    const form3 = useForm<TenantForm3Values>({
        resolver : zodResolver(form3Schema),
        defaultValues : initialData?.initialData3 || {
            propertyDoc : '',
            personalDoc : ''
        }
    })

    
    useEffect(()=>{
        const temp = units.filter((item)=> item.property._id === propertyId)
        setThisUnits(temp)
        form2.setValue('unit', '')
        
    },[propertyId])

    const onForm1Submit = async (data : TenantForm1Values) => {
        const isEmail = allUsers.filter((user) => user.email === data.email)
       if (initialData) {
            dispatch(addTenantData1(data))
            setForm(1)
       } else {
        if (isEmail.length > 0) {
            form1.setError('email', { type : 'required', message : "Email already in use"})
        } else {
            dispatch(addTenantData1(data))
            setForm(1)
        }
       }
       
    }

    const onForm2Submit = async (data : TenantForm2Values) => {
        dispatch(addTenantData2(data))
        setForm(2)

    }



    const onForm3Submit = async (data : TenantForm3Values) => {
        // console.log(tenantForm)

        if ( initialData ) {
                   const formData = {
                    _id : initialData.initialData1._id,
                    property : tenantForm.initialData2.property,
                    unit : tenantForm.initialData2.unit,
                    name : tenantForm.initialData1.name,
                    owner : owner._id,
                    image : tenantForm.initialData1.image,
                    email : tenantForm.initialData1.email,
                    contactNo : tenantForm.initialData1.contactNo,
                    occupation : tenantForm.initialData1.occupation,
                    startDate : tenantForm.initialData2.startDate,
                    endDate : tenantForm.initialData2.endDate,
                    address : tenantForm.initialData1.address,
                    city : tenantForm.initialData1.city,
                    state : tenantForm.initialData1.state,
                    country : tenantForm.initialData1.country,
                    postCode : tenantForm.initialData1.postCode,
                    NID : tenantForm.initialData1.NID,
                    due : tenantForm.initialData2.due,
                    age : tenantForm.initialData1.age,
                    familyMembers : tenantForm.initialData1.familyMembers,
                    status : tenantForm.initialData1.status,      
                    personalDoc : data.personalDoc,
                    propertyDoc : data.propertyDoc,
                }
                const result = await api.patch(`updateTenant`, formData,{validateStatus: () => true})
                dispatch(updateTenant(result.data))
                toast.success(toastMessage)
                router.push('/tenants')
                }
           
        else {
                

                   const formData = {
                    property : tenantForm.initialData2.property,
                    unit : tenantForm.initialData2.unit,
                    name : tenantForm.initialData1.name,
                    owner : owner._id,
                    image : tenantForm.initialData1.image,
                    email : tenantForm.initialData1.email,
                    pass_word : tenantForm.initialData1.pass_word,
                    contactNo : tenantForm.initialData1.contactNo,
                    occupation : tenantForm.initialData1.occupation,
                    startDate : tenantForm.initialData2.startDate,
                    endDate : tenantForm.initialData2.endDate,
                    address : tenantForm.initialData1.address,
                    city : tenantForm.initialData1.city,
                    state : tenantForm.initialData1.state,
                    country : tenantForm.initialData1.country,
                    postCode : tenantForm.initialData1.postCode,
                    NID : tenantForm.initialData1.NID,
                    due : tenantForm.initialData2.due,
                    age : tenantForm.initialData1.age,
                    familyMembers : tenantForm.initialData1.familyMembers,
                    status : tenantForm.initialData1.status,      
                    personalDoc : data.personalDoc,
                    propertyDoc : data.propertyDoc,
                }
                
                const result = await api.post(`createTenant`, formData,{validateStatus: () => true})
                    if (result.status === 200) {
                        dispatch(addTenant(result.data))
                        toast.success(toastMessage)
                        router.push('/tenants')
                        setForm(0)
                    } else {
                        toast.error("Email already in use")
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
        <div className='add my-10'>
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
                            <User className={`${form >= 0 ? 'text-green-500' : 'text-gray-500'}`} size={20} />
                        </div>
                        <h3 className={`text-center text-xs ${form >= 0 ? 'text-black font-semibold' : 'text-gray-500'}`}>Tenant Informations</h3>
                    </div>
                </button>
                

                <Separator className={`${form > 0 && 'bg-black'} w-1/4 mx-1`} />
                
                <button disabled={form < 1 && true} onClick={()=>setForm(1)}>
                    <div className='flex flex-col items-center gap-2'>
                        <div className={`${form > 0 ? 'bg-orange-100' : 'bg-gray-300'}  p-2 rounded-full`}>
                            <Home className={`${form > 0 ? 'text-orange-500' : 'text-gray-500'}`} size={20} />
                        </div>
                        <h3 className={`text-center text-xs ${form > 0 ? 'text-black font-semibold' : 'text-gray-500'}`}>Property Informations</h3>
                    </div>
                </button>

                <Separator className={`${form === 2 && 'bg-black'} w-1/4 mx-1`} />

                <button disabled={form < 2 && true} onClick={()=>setForm(2)}>
                    <div className='flex flex-col items-center gap-2'>
                        <div className={`${form === 2 ? 'bg-indigo-100' : 'bg-gray-300'}  p-2 rounded-full`}>
                            <FileText className={`${form === 2 ? 'text-indigo-500' : 'text-gray-500'}`} size={20} />
                        </div>
                        <h3 className={`text-center text-xs ${form === 2 ? 'text-black font-semibold' : 'text-gray-500'}`}>Documents</h3>
                    </div>
                </button>
            </div>

            {
                form === 0 &&

                <Form {...form1}>
                    <form onSubmit={form1.handleSubmit(onForm1Submit)} className='space-y-8 w-full'>
                        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                            <FormField
                                control={form1.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tenant Name <span className='text-red-500'>*</span></FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder='John Doe' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             {
                                !initialData &&
                                <FormField
                                control={form1.control}
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
                                control={form1.control}
                                name="pass_word"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password <span className='text-red-500'>*</span></FormLabel>
                                        <FormControl>
                                            <Input type='password' disabled={loading} placeholder='********' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            }
                            <FormField
                                control={form1.control}
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
                                control={form1.control}
                                name="NID"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>NID <span className='text-red-500'>*</span></FormLabel>
                                        <FormControl>
                                            <Input  type='number' disabled={loading} placeholder='5345634644' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form1.control}
                                name="age"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Age (in Years)</FormLabel>
                                        <FormControl>
                                            <Input type='number' disabled={loading} placeholder='25' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form1.control}
                                name="occupation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Occupation</FormLabel>
                                        <FormControl>
                                            <Input type='text' disabled={loading} placeholder='Teacher' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form1.control}
                                name="familyMembers"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Family Members</FormLabel>
                                        <FormControl>
                                            <Input type='number' disabled={loading} placeholder='2' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form1.control}
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
                                control={form1.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Permanent Address<span className='text-red-500'>*</span></FormLabel>
                                        <FormControl>
                                            <Input type='text' disabled={loading} placeholder='' {...field} />
                                        </FormControl>
                                        <FormMessage />
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
                                            <Input type='text' disabled={loading} placeholder='' {...field} />
                                        </FormControl>
                                        <FormMessage />
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
                                            <Input type='text' disabled={loading} placeholder='' {...field} />
                                        </FormControl>
                                        <FormMessage />
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
                                            <Input type='text' disabled={loading} placeholder='' {...field} />
                                        </FormControl>
                                        <FormMessage />
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
                                            <Input type='text' disabled={loading} placeholder='' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form1.control}
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
                                                Tenant activity status.
                                            </FormDescription>
                                        </div>
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
                        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                            <FormField
                                    control={form2.control}
                                    name="property"
                                    render={(item) => (
                                        <FormItem>
                                            <FormLabel>Property Name<span className='text-red-500'>*</span></FormLabel>
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
                                                            <SelectItem  value={_id} >
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
                                    control={form2.control}
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
                                                            ? thisUnits.map(({_id, name} : UnitProps)=>(
                                                                <SelectItem key={_id} value={_id} >
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
                                control={form2.control}
                                name="due"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Due (in BDT)</FormLabel>
                                        <FormControl>
                                            <Input  type='number' disabled={loading} placeholder='20' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form2.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lease Start Date <span className='text-red-500'>*</span></FormLabel>
                                        <FormControl>
                                            <Input type='date' disabled={loading} placeholder='example@gmail.com' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form2.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lease End Date <span className='text-red-500'>*</span></FormLabel>
                                        <FormControl>
                                            <Input type='date' disabled={loading} placeholder='example@gmail.com' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

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
                        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                        <FormField
                                control={form3.control}
                                name="propertyDoc"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Property Document <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                        <PdfUpload
                                                buttonName='Upload Property Pdf'
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
                                control={form3.control}
                                name="personalDoc"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Personal Document <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                        <PdfUpload
                                                buttonName='Upload pdf'
                                                value={field.value ? [field.value] : []}
                                                onChange={(url)=>field.onChange(url)}
                                                onRemove={()=>field.onChange("")}
                                            />
                                        </FormControl>
                                        <FormMessage />
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