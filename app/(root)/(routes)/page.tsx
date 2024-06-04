"use client"

import AccessProvider from "@/actions/accessProvider";
import LoadData from "@/actions/load-data";
import AdminDashboard from "@/components/dashboard/admin-dashboard";
import MaintainerDashboard from "@/components/dashboard/maintainer-dashboard";
import OwnerDashboard from "@/components/dashboard/owner-dashboard";
import TenantDashboard from "@/components/dashboard/tenant-dashboard";
import { getTenantInfo } from "@/redux/info/tenantInfoSlice";
import { TenantsReducerProps, UsersReducerProps } from "@/types";

import { useDispatch, useSelector } from "react-redux";

export default function Home() {

  const dispatch = useDispatch()

  const {user} = useSelector(({usersReducer} : UsersReducerProps)=> usersReducer)
  const {tenants} = useSelector(({tenantsReducer} : TenantsReducerProps)=> tenantsReducer)

  if (user.role === 'tenant') {
      const tenant = tenants.filter(({userId}) => userId === user._id)[0]
      dispatch(getTenantInfo(tenant))
  }

  return (
   <div className="px-5 mt-10 md:px-0">
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <h4 className="text-gray-500 text-sm">Welcome back, <span className="text-primary font-bold">
          {
            user.firstName === undefined || user.firstName === '' ?
            user.role
            :
            user.firstName
          }
          </span>
        </h4>  
      </div>
      <div className="w-full mt-5">
          {user.role === 'admin' && <AdminDashboard />}
          {user.role === 'owner' && <OwnerDashboard />}
          {user.role === 'tenant' && <TenantDashboard />}
          {user.role === 'maintainer' && <MaintainerDashboard />}
      </div>
   </div>
  );
}
