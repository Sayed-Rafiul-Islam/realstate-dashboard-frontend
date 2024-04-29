"use client"

import * as z from 'zod'
import { Trash } from "lucide-react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/heading"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

// import { 
//     Select, 
//     SelectContent, 
//     SelectItem, 
//     SelectTrigger, 
//     SelectValue 
// } from '@/components/ui/select'
import Pathname from '@/components/pathname'    
import './package-add.css'
import { Checkbox } from '@/components/ui/checkbox'


type SettingsFormValues = z.infer<typeof formSchema>

const formSchema = z.object({
    label : z.string().min(1),
    monthlyPrice : z.coerce.number().min(1),
    yearlyPrice : z.coerce.number().min(1),
    maxProperty : z.coerce.number().min(1),
    maxUnit : z.coerce.number().min(1),
    status : z.boolean().default(false),
    trial : z.boolean().default(false),
    // isArchieved : z.boolean().default(false).optional(),
})


const PackageForm = () => {

    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)


    const form = useForm<SettingsFormValues>({
        resolver : zodResolver(formSchema)})

    const onSubmit = async () => {
        try {
            setLoading(true)
                const newproduct = {
                 
                }
                
                // await createProduct(newproduct)
            

            // router.push(`/${storeId}/products`)
            // router.refresh()
            // toast.success(`${toastMessage}`)
        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='add'>
            <div className="flex items-center justify-between heading">
                <Heading
                title='Add New Package'
                description='Package Form'
                />
                <Pathname />
            </div>
            <Separator className='my-5' />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <div className='grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1'>
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Standard' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="monthlyPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Monthly Price <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input type='number' disabled={loading} placeholder='9.99' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="yearlyPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Yearly Price <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input type='number' disabled={loading} placeholder='9.99' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="maxProperty"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Max Property <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input type='number' disabled={loading} placeholder='5' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="maxUnit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Max Unit <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input type='number' disabled={loading} placeholder='10' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                       
                        {/* <FormField
                            control={form.control}
                            name="trial"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>On Trial <span className='text-red-500'>*</span></FormLabel>
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
                                                        placeholder="Select Trial Status"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={true} >
                                                    Yes
                                                </SelectItem>
                                                <SelectItem value={false} >
                                                    No
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}

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
                        <FormField
                            control={form.control}
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
                        />
                    </div>
                    <Button disabled={loading} className='ml-auto' type='submit'>
                        Add Package
                    </Button>
                </form>
            </Form> 
        </div>
    )
}

export default PackageForm