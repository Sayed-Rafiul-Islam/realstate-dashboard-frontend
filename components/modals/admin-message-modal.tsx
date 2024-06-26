"use client"

import { useEffect, useState } from "react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import { MaintainerProps, OwnerInfoReducerProps, OwnerPackageProps, OwnerProps, PackageProps, TenantProps, UserProps } from "@/types";
import { Separator } from "../ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useSelector } from "react-redux";

interface AdminMessageModalProps {
    isOpen : boolean,
    onClose : () => void,
    onConfirm : (data : FormProps) => void,
    loading : boolean,
    owners : OwnerProps[],
    admin : UserProps
}

export interface FormProps {
    fromName : string | undefined,
    fromRole : string,
    toName : string | undefined,
    toRole : string,
    body : string,
    status : boolean,
    read : boolean,
    date : Date,
    from : string,
    to : string,
    all ?: boolean
}

export const AdminMessageModal : React.FC<AdminMessageModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading,
    owners,
    admin
}) => {

    const [role,setRole] = useState('')

    const onChange = (open:boolean) => {
        if(!open) {
            onClose();
        }
    }

    type FormValue = z.infer<typeof formSchema>

    const formSchema = z.object({
        body : z.string().min(1, {message : "Message Required"}),
        owner : z.string().min(1, {message : "Owner Required"}),
    })



// ------------------------------------------------------------

    const form = useForm<FormValue>({
    resolver : zodResolver(formSchema)})

    const [allOwners,setAllOwners] = useState(false)
    const [ownerId,setOwnerId] = useState('')
    const [owner,setOwner] = useState<OwnerProps | null>()

    useEffect(()=>{
        if (ownerId === '') {
            setOwner(null)
        } else {
            const temp = owners?.filter((item) => item._id === ownerId)[0]
            setOwner(temp)
        }
    },[ownerId])



    const onSubmit = async (data : FormValue) => {
       
            
                if (allOwners) {
                    const formData = {
                        body : data.body,   
                        fromName : admin.firstName ? `${admin.firstName} ${admin.lastName}` : admin.lastName,
                        fromRole : 'admin',
                        toName : 'N/A',
                        toRole : 'owner',
                        status : false,
                        read : false,
                        date : new Date(),
                        from : admin._id,
                        to : 'N/A',
                        all : allOwners
                    }
        
                    onConfirm(formData)
        
                } else {
                    if (owner) {
                        const formData = {
                            body : data.body,   
                            fromName :admin.firstName ? `${admin.firstName} ${admin.lastName}` : admin.lastName,
                            fromRole : 'admin',
                            toName :  owner.user.firstName ? `${owner.user.firstName} ${owner.user.lastName}`:owner.user.lastName,
                            toRole : 'owner',
                            status : false,
                            read : false,
                            date : new Date(),
                            from : admin._id,
                            to : data.owner,
                        }
            
                        onConfirm(formData)
                }
            }
            

     
    
            //  onConfirm(formData)
         }
       

    

    // ----------------------------------------------------------------------------------
    // tenants message 

    


        
    

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent className="max-w-3xl">
            <DialogHeader>
                <DialogTitle>
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="text-xl">Compose Message</h3>
                    </div>
                    
                </DialogTitle>
                <Separator />
            </DialogHeader>

            <div>
               <div>
                    {
                        owners ?
                        <div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full mt-6'>                      
                                    <div className='grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1'>                       
                                        <FormField
                                            control={form.control}
                                            name="owner"
                                            render={(item) => (
                                                <FormItem>
                                                    <FormLabel>Select Owner <span className='text-red-500'>*</span></FormLabel>
                                                    <Select 
                                                            disabled={loading} 
                                                            onValueChange={e=> {
                                                                if (e === 'all') {
                                                                    setAllOwners(true)
                                                                    setOwnerId('')
                                                                } else {
                                                                    setAllOwners(false)
                                                                    setOwnerId(e)
                                                                }
                                                                return item.field.onChange(e)
                                                            }}
                                                            value={item.field.value}
                                                            defaultValue={item.field.value}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue 
                                                                        defaultValue={item.field.value}
                                                                        placeholder="Select Owner"
                                                                    />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="all" >
                                                                    All owners
                                                                </SelectItem>
                                                                { owners &&
                                                                    owners.map(({_id, user},index)=>(
                                                                        <SelectItem key={index} value={_id} >
                                                                            {
                                                                                user.firstName ? 
                                                                                    `${user.firstName} ${user.lastName}`
                                                                                    :
                                                                                    user.lastName
                                                                            }
                                                                        </SelectItem>
                                                                    ))
                                                                }
                                                            </SelectContent>
                                                        </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {
                                            owner  &&
                                            <div className="col-span-3">
                                                <h4 className="font-bold">To:</h4>
                                                <h4 className="text-sm">Name: <span className="font-bold">{
                                                                                owner.user.firstName ? 
                                                                                    `${owner.user.firstName} ${owner.user.lastName}`
                                                                                    :
                                                                                    owner.user.lastName
                                                                            }</span></h4>
                                                <h4 className="text-sm">Email: <span className="font-bold">{owner.user.email}</span></h4>
                                                <h4 className="text-sm">Contact No: <span className="font-bold">{owner.user.contactNo}</span></h4>
                                            </div>
                                        }
                                        <FormField
                                            control={form.control}
                                            name="body"
                                            render={({ field }) => (
                                                <FormItem className="col-span-3">
                                                    <FormLabel>Message <span className='text-red-500'>*</span></FormLabel>
                                                    <FormControl>
                                                        <Textarea  disabled={loading} placeholder='Write your message...' {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="flex gap-2 col-span-3">
                                            <Button disabled={loading} className='' type='submit'>
                                                Send
                                            </Button>
                                            <Button type="button" onClick={onClose} disabled={loading} className='' variant='outline'>
                                                Back
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </Form> 
                        </div>
                        :
                        <div>
                            <h4 className="text-red-500 text-xs">No owners available</h4>
                        </div>
                    }
                    
                         
                    </div>
            </div>
           
        </DialogContent>
    </Dialog>
    )
}