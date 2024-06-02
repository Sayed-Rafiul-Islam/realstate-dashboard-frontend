"use cilent"

import { useEffect, useState } from "react"
import Image from "next/image"
import { CldUploadWidget } from 'next-cloudinary';
import { Camera, File, ImagePlus, Trash } from "lucide-react";


import { Button } from "@/components/ui/button"

interface PdfUploadProps {
    buttonName:string,
    disabled?: boolean,
    onChange : (value: string) => void,
    onRemove : (value: string) => void,
    value : string[]

}

const PdfUpload : React.FC<PdfUploadProps> = ({
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
        <CldUploadWidget onUpload={onUpload} uploadPreset="grvpzykr">
                {({ open }) =>{
                    const onClick = () => {
                        open()
                    }

                    return (
                        <Button
                            variant='outline'
                            type="button"
                            disabled={disabled}
                            onClick={onClick}
                            className="flex items-center gap-2"
                        ><File size={15} /> Upload PDF</Button>
                    )
                }}
        </CldUploadWidget>
  )
}

export default PdfUpload
