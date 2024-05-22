"use client"

import Navbar from "@/components/Navbar";
import NavbarToggle from "@/components/navbar-toogle";
import SignOut from "@/components/signout";
import './content.css'
import LoadData from "@/actions/load-data";
import AccessProvider from "@/actions/accessProvider";



const RoutesLayout = ({
    children
} : {
    children : React.ReactNode
}) => {
  AccessProvider()
  LoadData()
    return ( 
        <div className="pt-5 px-5">
          <Navbar />
          <div className="fixed left-6 sm-nav-icon">
            <NavbarToggle />
          </div>
          <div className="fixed top-6 right-12 signout-btn">
            <SignOut />
          </div>
          <div className="body">
            {children}
          </div>
        </div>
     );
}
 
export default RoutesLayout;