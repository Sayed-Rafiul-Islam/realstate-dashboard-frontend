"use client"

import Navbar from "@/components/Navbar";
import NavbarToggle from "@/components/navbar-toogle";
import SignOut from "@/components/signout";
import './content.css'
import AccessProvider from "@/actions/accessProvider";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { LoadAllUsersData } from "@/actions/load-all-user-data";



const RoutesLayout = ({
    children
} : {
    children : React.ReactNode
}) => {
  const [expand, setExpand] = useState(true)
  AccessProvider()
  LoadAllUsersData()

  

  const [isMounted, setIsMounted] = useState(false)
  useEffect(()=>{
      setIsMounted(true)
  },[])

  if (!isMounted) {
      return null
  }
    return ( 
        <div className="pt-5 px-5">
          <div>
            <Navbar expand={expand} />              
            <button onClick={()=>setExpand(!expand)} className={`${expand ? "exp-btn-1" : "exp-btn-2"}`}><ChevronLeft /></button>
          </div>
            
          <div className="fixed left-6 sm-nav-icon">
            <NavbarToggle />
          </div>
          <div className="fixed top-6 right-12 signout-btn">
            <SignOut />
          </div>
          <div className={expand ? 'body' : 'body-1'}>
            {children}
          </div>
        </div>
     );
}
 
export default RoutesLayout;