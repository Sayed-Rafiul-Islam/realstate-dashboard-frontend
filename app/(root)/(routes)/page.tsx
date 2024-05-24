"use client"

import AccessProvider from "@/actions/accessProvider";
import LoadData from "@/actions/load-data";
import AdminDashboard from "@/components/dashboard/admin-dashboard";
import MaintainerDashboard from "@/components/dashboard/maintainer-dashboard";
import OwnerDashboard from "@/components/dashboard/owner-dashboard";
import TenantDashboard from "@/components/dashboard/tenant-dashboard";
import { UsersReducerProps } from "@/types";

import { useSelector } from "react-redux";

export default function Home() {

  const {email,role,firstName} = useSelector(({usersReducer} : UsersReducerProps)=> usersReducer.user)

  return (
   <div className="px-5 mt-10 md:px-0">
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <h4 className="text-gray-500 text-sm">Welcome back, <span className="text-primary font-bold">
          {
            firstName === undefined || firstName === '' ?
            role
            :
            firstName
          }
          </span>
        </h4>  
      </div>
      <div className="w-full mt-5">
          {role === 'admin' && <AdminDashboard />}
          {role === 'owner' && <OwnerDashboard />}
          {role === 'tenant' && <TenantDashboard />}
          {role === 'maintainer' && <MaintainerDashboard />}
      </div>
   </div>
  );
}
