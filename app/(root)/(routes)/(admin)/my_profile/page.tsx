// "use client"

// import * as z from 'zod'
// import { Trash } from "lucide-react"
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useState } from 'react'
// import toast from 'react-hot-toast'
// import { useParams, useRouter } from 'next/navigation'

// import { Button } from "@/components/ui/button"
// import { Separator } from "@/components/ui/separator"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { AlertModal } from '@/components/modals/alert-modal'
// import ImageUpload from '@/components/image-upload'
// import { 
//     Select, 
//     SelectContent, 
//     SelectItem, 
//     SelectTrigger, 
//     SelectValue 
// } from '@/components/ui/select'
// import { Checkbox } from '@/components/ui/checkbox'
// import AccessProvider from "@/actions/accessProvider";
// import { useSelector } from 'react-redux'
// import { UsersReducerProps } from '@/types'
// import Pathname from '@/components/pathname'

// type SettingsFormValues = z.infer<typeof formSchema>

// const formSchema = z.object({
//     name : z.string().min(1),
//     price : z.coerce.number().min(1),
//     quantity : z.coerce.number().min(1),
//     imageUrl : z.string().min(1),
//     categoryId : z.string().min(1),
//     sizeId : z.string().min(1),
//     colorId : z.string().min(1),
//     isFeatured : z.boolean().default(false).optional(),
//     isArchieved : z.boolean().default(false).optional(),
// })


// const MyProfile = () => {

//     AccessProvider()
//     const {user_name} = useSelector(({usersReducer} : UsersReducerProps)=> usersReducer.user)

//     const router = useRouter()
//     const [open, setOpen] = useState(false)
//     const [loading, setLoading] = useState(false)
    

//     const form = useForm<SettingsFormValues>({
//         resolver : zodResolver(formSchema),
//         // defaultValues : {

//         // } 
//     })

//     const onSubmit = async (data : SettingsFormValues) => {
        
//     }

//     // const formattedOwnerPackages : OwnerPackageProps[] = ownerPackages.map((
//     //     {
//     //         _id,
//     //         name,
//     //         email,
//     //         packageName,
//     //         gateway,
//     //         startDate,
//     //         endDate,
//     //         paymentStatus,
//     //         status
//     //     } : OwnerPackageProps,index : number) => ({
//     //         serial : index + 1,
//     //         _id,
//     //         name,
//     //         email,
//     //         packageName,
//     //         gateway,
//     //         startDate : format(startDate,"MMMM do, yyyy"),
//     //         endDate : format(endDate,"MMMM do, yyyy"),
//     //         paymentStatus,
//     //         status
//     // }))


//     // console.log(ownerPackages)

//     return ( 
//         <div className="flex-col">
//         <div className="flex-1 p-8 pt-6 space-y-4">
//             <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
//                 <h1 className="font-bold text-xl">My Profile</h1>
//                 <Pathname />
//             </div>
//             <Separator />              
//             <>
//             {/* <AlertModal 
//                 isOpen={open}
//                 onClose={() => setOpen(false)}
//                 onConfirm={onDelete}
//                 loading={loading}
//             /> */}
//             <div className="flex items-center justify-between">
//                 {/* <Heading
//                 title={title}
//                 description={description}
//                 /> */}
//             </div>
//             <Separator />

//             <Form {...form}>
//                 <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
//                     <FormField
//                             control={form.control}
//                             name="imageUrl"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Background image</FormLabel>
//                                     <FormControl>
//                                         <ImageUpload  
//                                             buttonName='Upload an Image'
//                                             value={field.value ? [field.value] : []}
//                                             disabled={loading}
//                                             onChange={(url)=>field.onChange(url)}
//                                             onRemove={()=>field.onChange("")}
//                                         />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                     <div className='grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1'>
//                         <FormField
//                             control={form.control}
//                             name="name"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Name</FormLabel>
//                                     <FormControl>
//                                         <Input disabled={loading} placeholder='product name' {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="price"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Price</FormLabel>
//                                     <FormControl>
//                                         <Input type='number' disabled={loading} placeholder='9.99' {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="quantity"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Quantity</FormLabel>
//                                     <FormControl>
//                                         <Input type='number' disabled={loading} placeholder='48' {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
                        
                        
//                         <FormField
//                             control={form.control}
//                             name="isFeatured"
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
//                                             Featured
//                                         </FormLabel>
//                                         <FormDescription>
//                                             This product will appear on home page.
//                                         </FormDescription>
//                                     </div>
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="isArchieved"
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
//                                             Archieved
//                                         </FormLabel>
//                                         <FormDescription>
//                                             This product will not appear anywhere in store.
//                                         </FormDescription>
//                                     </div>
//                                 </FormItem>
//                             )}
//                         />
//                     </div>
//                     <Button disabled={loading} className='ml-auto' type='submit'>
//                         Update
//                     </Button>
//                 </form>
//             </Form>
//             <Separator />
//         </>
//         </div>
        
//     </div>
//      );
// }
 
// export default MyProfile;