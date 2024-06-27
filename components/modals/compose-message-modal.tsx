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

interface ComposeMessageProps {
    isOpen : boolean,
    onClose : () => void,
    onConfirm : (data : FormProps) => void,
    loading : boolean,
    admin ?: UserProps,
    tenants ?: TenantProps[],
    maintainers ?: MaintainerProps[]
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

export const ComposeMessage : React.FC<ComposeMessageProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading,
    admin,
    tenants,
    maintainers
}) => {

    const [role,setRole] = useState('')
    const thisOwner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo

    // /--------------------------------------------------------------

    const onChange = (open:boolean) => {
        // adminForm.resetField('body')
        // tenantForm.resetField('body')
        // maintainerForm.resetField('body')
        if(!open) {
            onClose();
        }
    }

    // ------------------------------------------------------------------

    type AdminFormValue = z.infer<typeof adminFormSchema>
    type TenantFormValue = z.infer<typeof tenantFormSchema>
    type MaintainerFormValue = z.infer<typeof maintainerFormSchema>

const adminFormSchema = z.object({
    body : z.string().min(1, {message : "Message Required"}),
})

const tenantFormSchema = z.object({
    tenant : z.string().min(1, {message : "Tenant Required"}),
    body : z.string().min(1, {message : "Message Required"}),
})

const maintainerFormSchema = z.object({
    maintainer : z.string().min(1, {message : "Maintainer Required"}),
    body : z.string().min(1, {message : "Message Required"}),
})


// ------------------------------------------------------------

    const adminForm = useForm<AdminFormValue>({
    resolver : zodResolver(adminFormSchema)})



    const onAdminSubmit = async (data : AdminFormValue) => {
         if (admin) {
            const formData = {
                ...data,
                fromName : thisOwner.user.firstName ? `${thisOwner.user.firstName} ${thisOwner.user.lastName}` : thisOwner.user.lastName,
                fromRole : 'owner',
                toName : admin.firstName ? `${admin.firstName} ${admin.lastName}` : admin.lastName,
                toRole : 'admin',
                status : false,
                read : false,
                date : new Date(),
                from : thisOwner.user._id,
                to : admin._id,
             }

             console.log("here")
    
             onConfirm(formData)
         }
       

    }

    // ----------------------------------------------------------------------------------
    // tenants message 

    const [allTenants,setAllTenants] = useState(false)
    const [tenantId,setTenantId] = useState('')
    const [tenant,setTenant] = useState<TenantProps | null>()

    useEffect(()=>{
        if (tenantId === '') {
            setTenant(null)
        } else {
            const temp = tenants?.filter((item) => item._id === tenantId)[0]
            setTenant(temp)
        }
    },[tenantId])

    const tenantForm = useForm<TenantFormValue>({
    resolver : zodResolver(tenantFormSchema)})

    const onTenantSubmit = async (data : TenantFormValue) => {
        if (allTenants) {
            const formData = {
                body : data.body,   
                fromName : thisOwner.user.firstName ? `${thisOwner.user.firstName} ${thisOwner.user.lastName}` : thisOwner.user.lastName,
                fromRole : 'owner',
                toName : 'N/A',
                toRole : 'tenant',
                status : false,
                read : false,
                date : new Date(),
                from : thisOwner._id,
                to : 'N/A',
                all : allTenants
            }

            onConfirm(formData)

        } else {

            if (tenants) {
                const name = tenants.filter((tenant) => tenant._id === data.tenant)[0].name
                const formData = {
                    body : data.body,   
                    fromName : thisOwner.user.firstName ? `${thisOwner.user.firstName} ${thisOwner.user.lastName}` : thisOwner.user.lastName,
                    fromRole : 'owner',
                    toName : name,
                    toRole : 'tenant',
                    status : false,
                    read : false,
                    date : new Date(),
                    from : thisOwner.user._id,
                    to : data.tenant,
                }
    
                onConfirm(formData)
            }
        }
       

    }

     // ----------------------------------------------------------------------------------
    // maintainer message 

    const [allMaintainers,setAllMaintainers] = useState(false)
    const [maintainerId,setMaintainerId] = useState('')
    const [maintainer,setMaintainer] = useState<MaintainerProps | null>()

    useEffect(()=>{
        if (maintainerId === '') {
            setMaintainer(null)
        } else {
            const temp = maintainers?.filter((item) => item._id === maintainerId)[0]
            setMaintainer(temp)
        }
    },[maintainerId])

    const maintainerForm = useForm<MaintainerFormValue>({
    resolver : zodResolver(maintainerFormSchema)})

    const onMaintainerSubmit = async (data : MaintainerFormValue) => {
        if (allMaintainers) {
            const formData = {
                body : data.body,   
                fromName : thisOwner.user.firstName ? `${thisOwner.user.firstName} ${thisOwner.user.lastName}` : thisOwner.user.lastName,
                fromRole : 'owner',
                toName : 'N/A',
                toRole : 'maintainer',
                status : false,
                read : false,
                date : new Date(),
                from : thisOwner._id,
                to : 'N/A',
                all : allMaintainers
            }

            onConfirm(formData)

        } else {

            if (maintainers) {
                const name = maintainers.filter((maintainer) => maintainer._id === data.maintainer)[0].name
                const formData = {
                    body : data.body,   
                    fromName : thisOwner.user.firstName ? `${thisOwner.user.firstName} ${thisOwner.user.lastName}` : thisOwner.user.lastName,
                    fromRole : 'owner',
                    toName : name,
                    toRole : 'maintainer',
                    status : false,
                    read : false,
                    date : new Date(),
                    from : thisOwner.user._id,
                    to : data.maintainer,
                }
    
                onConfirm(formData)
            }
        }
       

    }



        
    

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent className="max-w-3xl">
            <DialogHeader>
                <DialogTitle>
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="text-xl">Compose Message</h3>
                    </div>

                    <div className="w-1/3 text-gray-500">
                        <Label className="text-black mb-2 block">Target Audience <span className="text-red-500">*</span></Label>
                        <Select 
                            disabled={loading} 
                            onValueChange={e=>setRole(e)} 
                            value={role}
                            defaultValue={role}
                            
                        >
                            
                            <SelectTrigger>
                                <SelectValue 
                                    defaultValue={role}
                                    placeholder="Select Audience"
                                />
                            </SelectTrigger>
                        
                            <SelectContent >
                                <SelectItem value="admin" >
                                    Admin
                                </SelectItem>
                                <SelectItem value="tenant" >
                                    Tenant
                                </SelectItem>
                                <SelectItem value="maintainer" >
                                    Maintainer
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    
                </DialogTitle>
                <Separator />
            </DialogHeader>

            <div>
                {
                    role === 'admin' &&
                    <div>
                        <div>
                            <h4 className="font-bold">To:</h4>
                            <h4 className="text-sm">Name: <span className="font-bold">{admin?.firstName ? `${admin.firstName} ${admin.lastName}` : admin?.lastName}</span></h4>
                            <h4 className="text-xs">Role: <span className="font-bold text-gray-500">{admin?.role}</span></h4>
                        </div>
                         <Form {...adminForm}>
                            <form onSubmit={adminForm.handleSubmit(onAdminSubmit)} className='space-y-8 w-full mt-6'>                      
                                    <FormField
                                        control={adminForm.control}
                                        name="body"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Message <span className='text-red-500'>*</span></FormLabel>
                                                <FormControl>
                                                    <Textarea  disabled={loading} placeholder='Write your message...' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                <Button disabled={loading} className='ml-auto' type='submit'>
                                    Send
                                </Button>
                                <Button type="button" onClick={onClose} disabled={loading} className='ml-2' variant='outline'>
                                    Back
                                </Button>
                               
                            </form> 

                        </Form> 
                    </div>
                }

                {
                    role === 'tenant' &&
                    <div>
                        {
                            tenants && tenants.length > 0 ?
                            <div>
                                <Form {...tenantForm}>
                                    <form onSubmit={tenantForm.handleSubmit(onTenantSubmit)} className='space-y-8 w-full mt-6'>                      
                                        <div className='grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1'>                       
                                            <FormField
                                                control={tenantForm.control}
                                                name="tenant"
                                                render={(item) => (
                                                    <FormItem>
                                                        <FormLabel>Select Tenant <span className='text-red-500'>*</span></FormLabel>
                                                        <Select 
                                                                disabled={loading} 
                                                                onValueChange={e=> {
                                                                    if (e === 'all') {
                                                                        setAllTenants(true)
                                                                        setTenantId('')
                                                                    } else {
                                                                        setAllTenants(false)
                                                                        setTenantId(e)
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
                                                                            placeholder="Select Tenant"
                                                                        />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="all" >
                                                                        All tenants
                                                                    </SelectItem>
                                                                    { tenants &&
                                                                        tenants.map(({_id, name},index)=>(
                                                                            <SelectItem key={index} value={_id} >
                                                                                {name}
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
                                                tenant  &&
                                                <div className="col-span-3">
                                                    <h4 className="font-bold">To:</h4>
                                                    <h4 className="text-sm">Name: <span className="font-bold">{tenant.name}</span></h4>
                                                    <h4 className="text-sm">Property: <span className="font-bold">{tenant.property.name}</span></h4>
                                                    <h4 className="text-sm">Unit: <span className="font-bold">{tenant.unit.name}</span></h4>
                                                </div>
                                            }
                                            <FormField

                                                control={tenantForm.control}
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
                                <h4 className="text-red-500 text-xs">No tenants available</h4>
                            </div>
                        }
                        {/* <div>
                            <h4 className="font-bold">To:</h4>
                            <h4 className="font-bold text-sm">{admin?.firstName ? `${admin.firstName} ${admin.lastName}` : admin?.lastName}</h4>
                            <h4 className="font-bold text-gray-500 text-xs">{admin?.role}</h4>
                        </div> */}
                         
                    </div>
                }

                {
                    role === 'maintainer' &&
                    <div>
                        {
                            maintainers && maintainers.length > 0 ?
                            <div>
                                <Form {...maintainerForm}>
                                    <form onSubmit={maintainerForm.handleSubmit(onMaintainerSubmit)} className='space-y-8 w-full mt-6'>                      
                                        <div className='grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1'>                       
                                            <FormField
                                                control={maintainerForm.control}
                                                name="maintainer"
                                                render={(item) => (
                                                    <FormItem>
                                                        <FormLabel>Select Maintainer <span className='text-red-500'>*</span></FormLabel>
                                                        <Select 
                                                                disabled={loading} 
                                                                onValueChange={e=> {
                                                                    if (e === 'all') {
                                                                        setAllMaintainers(true)
                                                                        setMaintainerId('')
                                                                    } else {
                                                                        setAllMaintainers(false)
                                                                        setMaintainerId(e)
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
                                                                            placeholder="Select Maintainer"
                                                                        />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="all" >
                                                                        All Maintainers
                                                                    </SelectItem>
                                                                    { maintainers &&
                                                                        maintainers.map(({_id, name},index)=>(
                                                                            <SelectItem key={index} value={_id} >
                                                                                {name}
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
                                                maintainer  &&
                                                <div className="col-span-3">
                                                    <h4 className="font-bold">To:</h4>
                                                    <h4 className="text-sm">Name: <span className="font-bold">{maintainer.name}</span></h4>
                                                    <h4 className="text-sm">Property: <span className="font-bold">{maintainer.property.name}</span></h4>
                                                    <h4 className="text-sm">Type: <span className="font-bold">{maintainer.type.maintainer}</span></h4>
                                                </div>
                                            }
                                            <FormField

                                                control={maintainerForm.control}
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
                                <h4 className="text-red-500 text-xs">No maintainer available</h4>
                            </div>
                        }
                        {/* <div>
                            <h4 className="font-bold">To:</h4>
                            <h4 className="font-bold text-sm">{admin?.firstName ? `${admin.firstName} ${admin.lastName}` : admin?.lastName}</h4>
                            <h4 className="font-bold text-gray-500 text-xs">{admin?.role}</h4>
                        </div> */}
                         
                    </div>
                }
            </div>
            {/* <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <div className='grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1'>                       
                        <FormField
                            control={form.control}
                            name="owner"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Owner <span className='text-red-500'>*</span></FormLabel>
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
                                                        placeholder="Select Owner"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {owners.map(({_id, user},index)=>(
                                                    <SelectItem key={index} value={_id} >
                                                        {user.email}
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
                            name="package"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Package <span className='text-red-500'>*</span></FormLabel>
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
                                                        placeholder="Select Package"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {packages.map(({_id, label},index)=>(
                                                    <SelectItem key={index} value={_id} >
                                                        {label}
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
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type <span className='text-red-500'>*</span></FormLabel>
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
                                                        placeholder="Select Type"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                    <SelectItem value="monthly" >
                                                        Monthly
                                                    </SelectItem>
                                                    <SelectItem value="yearly" >
                                                        Yearly
                                                    </SelectItem>

                                            </SelectContent>
                                        </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gateway"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gateway <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Bkash" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className='ml-auto' type='submit'>
                        Assign
                    </Button>
                    <Button onClick={onClose} disabled={loading} className='ml-2' variant='outline'>
                        Back
                    </Button>
                </form>
            </Form>  */}
        </DialogContent>
    </Dialog>
    )
}