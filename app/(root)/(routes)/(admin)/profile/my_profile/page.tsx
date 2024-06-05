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
import toast from 'react-hot-toast'
import ImageUpload from '@/components/image-upload'
import { useSelector } from 'react-redux'
import { UsersReducerProps } from '@/types'
import api from '@/actions/api'
import { useEffect, useState } from 'react'

type ProfileValue = z.infer<typeof formSchema>

const formSchema = z.object({
    firstName : z.string(),
    lastName : z.string(),
    contactNo : z.string(),
    email : z.string(),
    NID : z.string(),
    birthDate : z.string(),
    imageUrl : z.string(),
    printName : z.string(),
    printAddress : z.string(),
    printContact : z.string(),
    printLogo : z.string(),
})


const MyProfile = () => {  

    const {user} = useSelector(({usersReducer} : UsersReducerProps)=> usersReducer)
    
    const form = useForm<ProfileValue>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            firstName : user.firstName ? user.firstName : '',
            lastName : user.lastName ? user.lastName : '',
            contactNo : user.contactNo ? user.contactNo : '',
            email : user.email,
            NID : user.NID ? user.NID : '',
            birthDate : user.birthDate ? user.birthDate : '',
            imageUrl : user.imageUrl ? user.imageUrl : '',
            printName : user.printName ? user.printName : '',
            printAddress : user.printAddress ? user.printAddress : '',
            printContact : user.printContact ? user.printContact : '',
            printLogo : user.printLogo ? user.printLogo : '',
        } 
    })

    const onSubmit = async (profileData : ProfileValue) => {
        const data = await api.patch(`updateUser`,profileData,{validateStatus: () => true})
        toast.success("Profile updated.")
    }



    return ( 
        <div className="flex-col">
        <div className="flex-1 p-8 pt-6 space-y-4">
            <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                <h1 className="font-bold text-xl">My Profile</h1>
                <Pathname />
            </div>
            <Separator />   

            <h3 className='font-semibold'>Personal Information</h3>           
            <div className='pt-4'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem className=''>
                                    <FormControl className=''>
                                        <ProfileImageUpload
                                            buttonName='Upload an Image'
                                            value={field.value ? [field.value] : []}
                                            onChange={(url)=>field.onChange(url)}
                                            onRemove={()=>field.onChange("")}
                                            defaultValue={user.imageUrl}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    <div className='grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1'>
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='John' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Doe' {...field} />
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
                                    <FormLabel>Contact</FormLabel>
                                    <FormControl>
                                        <Input placeholder='017********' {...field} />
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
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder='example@gmail.com' {...field} />
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

                    <Separator />

                    <h3 className='font-semibold'>Print Details</h3>    

                    <div className='grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1'>
                    <FormField
                            control={form.control}
                            name="printLogo"
                            render={({ field }) => (
                                <FormItem className=''>
                                    <FormLabel className=''>Print Logo</FormLabel>
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
                            name="printName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Print Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="printAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Print Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder='' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="printContact"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Print Contact</FormLabel>
                                    <FormControl>
                                        <Input placeholder='' {...field} />
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
        </div>
        </div>
        
    </div>
     );
}
 
export default MyProfile;