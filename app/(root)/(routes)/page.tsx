"use client"

import AdminDashboard from "@/components/dashboard/admin-dashboard";
import MaintainerDashboard from "@/components/dashboard/maintainer-dashboard";
import OwnerDashboard from "@/components/dashboard/owner-dashboard";
import TenantDashboard from "@/components/dashboard/tenant-dashboard";
import { getMaintainerInfo } from "@/redux/info/maintainerInfoSlice";
import { getOwnerInfo } from "@/redux/info/ownerInfoSlice";
import { getTenantInfo } from "@/redux/info/tenantInfoSlice";
import { MaintainersReducerProps, OwnersReducerProps, TenantsReducerProps, UsersReducerProps } from "@/types";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

export default function Home() {

  const dispatch = useDispatch()

  const {_id,role,firstName} = useSelector(({usersReducer} : UsersReducerProps)=> usersReducer).user
  const {tenants} = useSelector(({tenantsReducer} : TenantsReducerProps)=> tenantsReducer)
  const {maintainers} = useSelector(({maintainersReducer} : MaintainersReducerProps)=> maintainersReducer)
  const {owners} = useSelector(({ownersReducer} : OwnersReducerProps)=> ownersReducer)

  if (role === 'tenant') {
      const tenant = tenants.filter(({user}) => user._id === _id)[0]
      dispatch(getTenantInfo(tenant))
  } else if (role === 'maintainer') {
    const maintainer = maintainers.filter(({userId}) => userId === _id)[0]
    dispatch(getMaintainerInfo(maintainer))
  } else if (role === 'owner') {    
    const owner = owners.filter(({user}) => user._id === _id)[0]
    dispatch(getOwnerInfo(owner))
  }

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
      {/* <AdminDashboard /> */}
          {role === 'admin' && <AdminDashboard />}
          {role === 'owner' && <OwnerDashboard />}
          {role === 'tenant' && <TenantDashboard />}
          {role === 'maintainer' && <MaintainerDashboard />}
      </div>
   </div>
  );
}
