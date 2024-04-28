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

  const {user_name,role} = useSelector(({usersReducer} : UsersReducerProps)=> usersReducer.user)

  return (
   <div>
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <h4 className="text-gray-500 text-sm">Welcome back, <span className="text-primary font-bold">{user_name}</span></h4>  
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
