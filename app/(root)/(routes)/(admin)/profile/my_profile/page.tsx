"use client"

import * as z from 'zod'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'


import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Pathname from '@/components/pathname'
import ProfileImageUpload from '@/components/profile-image-upload'

type ProfileValue = z.infer<typeof formSchema>

const formSchema = z.object({
    contactNo : z.string(),
    birthDate : z.string(),
    NID : z.string(),
    imageUrl : z.string()
})


const MyProfile = () => {  
    
    const form = useForm<ProfileValue>({
        resolver : zodResolver(formSchema),
        // defaultValues : {

        // } 
    })

    const onSubmit = async (data : ProfileValue) => {
        console.log(data)
    }


    return ( 
        <div className="flex-col">
        <div className="flex-1 p-8 pt-6 space-y-4">
            <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                <h1 className="font-bold text-xl">My Profile</h1>
                <Pathname />
            </div>
            <Separator />              
            <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem className=''>
                                    
                                    {/* <FormLabel className=''>Upload an Image</FormLabel> */}
                                    <FormControl className=''>
                                        <ProfileImageUpload
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
                    <div className='grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1'>
                        <FormField
                            control={form.control}
                            name="contactNo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact No</FormLabel>
                                    <FormControl>
                                        <Input placeholder='017********' {...field} />
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
                                    <FormLabel>NID Number</FormLabel>
                                    <FormControl>
                                        <Input type='number' placeholder='88775*****' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="birthDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date of Birth</FormLabel>
                                    <FormControl>
                                        <Input type='date' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                       
                    </div>
                    <Button className='ml-auto bg-purple-600' type='submit'>
                        Update Profile
                    </Button>
                </form>
            </Form>
        </>
        </div>
        
    </div>
     );
}
 
export default MyProfile;