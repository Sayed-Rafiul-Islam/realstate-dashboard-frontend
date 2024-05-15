"use client"
import Pathname from "@/components/pathname";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MaintainersReducerProps } from "@/types";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import MaintainerCard from "./components/maintainer-card";
import Maintainers from "./components/maintainers";


const ALLMaintainers = () => {
    const router = useRouter()
    const {maintainers} = useSelector(({maintainersReducer} : MaintainersReducerProps) => maintainersReducer)
   
    return ( 
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <Pathname />
                <div className="flex justify-between md:flex-row flex-col gap-2"> 
                    <h1 className="font-bold text-xl">All Maintainers</h1>
                    <Button className="lg:w-1/4 md:w-1/5 w-2/3" onClick={()=>router.push('/maintainers/add')}>Add Maintainer</Button>
                </div>
                <Separator />

                <Maintainers data={maintainers} />
            </div>
        </div>
     );
}
 
export default ALLMaintainers;