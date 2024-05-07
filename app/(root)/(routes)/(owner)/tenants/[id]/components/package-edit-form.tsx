// "use client"

import { PropertyProps } from "@/types"

// import * as z from 'zod'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useEffect, useState } from 'react'
// import toast from 'react-hot-toast'

// import { Button } from "@/components/ui/button"
// import { Heading } from "@/components/heading"
// import { Separator } from "@/components/ui/separator"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { PackageProps, PropertyProps } from '@/types'
// import Pathname from '@/components/pathname'
// import { Checkbox } from '@/components/ui/checkbox'
// import './package-form.css'


// type PackageFormValues = z.infer<typeof formSchema>

interface PropertyFormProps {
    initialData: PropertyProps
}

// const formSchema = z.object({
//     label : z.string().min(1, {message : "Label Required"}),
//     monthlyPrice : z.coerce.number().min(1),
//     yearlyPrice : z.coerce.number().min(1),
//     maxProperty : z.coerce.number().min(1),
//     maxUnit : z.coerce.number().min(1),
//     status : z.boolean().default(false),
//     trial : z.boolean().default(false),
// })


export const PackageEditForm : React.FC<PropertyFormProps> = ({
    initialData
}) => {

    return (
        <div>Later</div>

//     const title = initialData ? 'Edit Package' : 'Create Package'
//     const action = initialData ? 'Save Changes' : 'Create'
//     const description = initialData ? "Edit a package" : "Create a new package"
//     const toastMessage = initialData ? "Color updated" : "Color created"
 






//     const [loading, setLoading] = useState(false)
//     const form = useForm<PackageFormValues>({
//         resolver : zodResolver(formSchema),
//         defaultValues : initialData || {
//             label : '',
//             monthlyPrice : 2,
//             yearlyPrice : 20,
//             maxProperty : 10,
//             maxUnit : 8,
//             status : false,
//             trial : false
//         }
//     })

//     const onSubmit = async (data : PackageFormValues) => {
//         console.log(data)
//         try {
//             setLoading(true)
//                 const updatePackage = {
                 
//                 }
                
//         } catch (error) {
//             toast.error("Something went wrong.")
//         } finally {
//             setLoading(false)
//         }
//     }

//     const [isMounted, setIsMounted] = useState(false)

//     useEffect(()=>{
//         setIsMounted(true)
//     },[])

//     if (!isMounted) {
//         return null
//     }
  
//     return (
//         <div className='add'>
//             <div className="flex items-center justify-between heading">
//                 <Heading
//                     title={title}
//                     description={description}
//                 />
//                 <Pathname />
//             </div>
//             <Separator className='my-5' />

//             <Form {...form}>
//                 <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
//                     <div className='grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1'>
//                         <FormField
//                             control={form.control}
//                             name="label"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Label <span className='text-red-500'>*</span></FormLabel>
//                                     <FormControl>
//                                         <Input disabled={loading} placeholder='Standard' {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="monthlyPrice"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Monthly Price <span className='text-red-500'>*</span></FormLabel>
//                                     <FormControl>
//                                         <Input type='number' disabled={loading} placeholder='9.99' {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="yearlyPrice"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Yearly Price <span className='text-red-500'>*</span></FormLabel>
//                                     <FormControl>
//                                         <Input type='number' disabled={loading} placeholder='9.99' {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="maxProperty"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Max Property <span className='text-red-500'>*</span></FormLabel>
//                                     <FormControl>
//                                         <Input type='number' disabled={loading} placeholder='5' {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="maxUnit"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Max Unit <span className='text-red-500'>*</span></FormLabel>
//                                     <FormControl>
//                                         <Input type='number' disabled={loading} placeholder='10' {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         <FormField
//                             control={form.control}
//                             name="status"
//                             render={({ field }) => (
//                                 <FormItem className='flex flex-row rounded-md border p-4 items-start space-x-3 space-y-0'>
//                                     <FormControl>
//                                         <Checkbox
//                                             checked={field.value}
//                                             onCheckedChange={field.onChange}
//                                         />
//                                     </FormControl>
//                                     <div className='space-y-1 leading-none'>
//                                         <FormLabel>
//                                             Active <span className='text-red-500'>*</span>
//                                         </FormLabel>
//                                         <FormDescription>
//                                             This package will be Activated.
//                                         </FormDescription>
//                                     </div>
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="trial"
//                             render={({ field }) => (
//                                 <FormItem className='flex flex-row rounded-md border p-4 items-start space-x-3 space-y-0'>
//                                     <FormControl>
//                                         <Checkbox
//                                             checked={field.value}
//                                             onCheckedChange={field.onChange}
//                                         />
//                                     </FormControl>
//                                     <div className='space-y-1 leading-none'>
//                                         <FormLabel>
//                                             On Trial <span className='text-red-500'>*</span>
//                                         </FormLabel>
//                                         <FormDescription>
//                                             This package will be set as trial version.
//                                         </FormDescription>
//                                     </div>
//                                 </FormItem>
//                             )}
//                         />
//                     </div>
//                     <Button disabled={loading} className='ml-auto' type='submit'>
//                         {action}
//                     </Button>
//                 </form>
//             </Form> 
//         </div>
    )
}