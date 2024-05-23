"use cilent"

import { useEffect, useState } from "react"
import Image from "next/image"
import { CldUploadWidget } from 'next-cloudinary';
import { Camera, ImagePlus, Trash } from "lucide-react";

interface ProfileImageUploadProps {
    buttonName:string,
    disabled?: boolean,
    onChange : (value: string) => void,
    onRemove : (value: string) => void,
    value : string[]

}

const ProfileImageUpload : React.FC<ProfileImageUploadProps> = ({
    buttonName,
    disabled,
    onChange,
    onRemove,
    value
}) => {

    const [mounted, setMounted] = useState(false)

    useEffect(()=>{
        setMounted(true)
    },[])


    const onUpload = (result : any ) => {
        onChange(result.info.secure_url)
    }

    if (!mounted) {
        return null
    }


  return (
    <div>
        {/* <div className="mb-4 gap-4 flex items-center">
            {value.map((url)=>(
                <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                    <div className="z-10 absolute top-2 right-2">
                        <Button type="button" onClick={()=>onRemove(url)} variant='destructive' size='icon'>
                            <Trash />
                        </Button>
                    </div>
                    <Image 
                        fill
                        className="object-cover"
                        alt="Image"
                        src={url}
                    />
                </div>
            ))}
        </div> */}
        <CldUploadWidget onUpload={onUpload} uploadPreset="grvpzykr">
                {({ open }) =>{
                    const onClick = () => {
                        open()
                    }

                    return (
                        <div className="bg-gray-200 h-[100px] w-[100px] rounded-full flex justify-end items-end relative">
                            <div className="absolute h-full w-full flex justify-center items-center rounded-full">
                                {
                                    value.length > 0
                                    ? 
                                    <div className="">
                                    {value.map((url)=>(
                                        <div key={url} className="relative w-[100px] h-[100px] rounded-full overflow-hidden border-indigo-500 border-4">
                                                {/* <div className="z-10 absolute top-2 right-2">
                                                    <Button type="button" onClick={()=>onRemove(url)} variant='destructive' size='icon'>
                                                        <Trash />
                                                    </Button>
                                                </div> */}
                                            <Image 
                                                fill
                                                className="object-cover"
                                                alt="Image"
                                                src={url}
                                            />
                                        </div>
                                    ))}
                                </div>  
                                    :
                                    <ImagePlus size={25} className="text-gray-400" />
                                }
                                
                            </div>
                            <button
                                type="button"
                                disabled={disabled}
                                onClick={onClick}
                                className="bg-purple-600 rounded-full w-[30px] h-[30px] z-10" 
                            >
                                <Camera className="h-4 w-4 mx-auto text-white" />
                                
                                {/* {buttonName} */}
                            </button>
                        </div>
                    )
                }}
        </CldUploadWidget>
    </div>
  )
}

export default ProfileImageUpload
