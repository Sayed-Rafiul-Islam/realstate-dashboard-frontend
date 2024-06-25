"use client"
import { LoadAdminData } from "@/actions/load-admin-data";
import AdminDashboard from "@/components/dashboard/admin-dashboard";
import MaintainerDashboard from "@/components/dashboard/maintainer-dashboard";
import OwnerDashboard from "@/components/dashboard/owner-dashboard";
import TenantDashboard from "@/components/dashboard/tenant-dashboard";
import { getMaintainerInfo } from "@/redux/info/maintainerInfoSlice";
import { getOwnerInfo } from "@/redux/info/ownerInfoSlice";
import { getTenantInfo } from "@/redux/info/tenantInfoSlice";
import { MaintainersReducerProps, OwnersReducerProps, TenantsReducerProps, UsersReducerProps } from "@/types";

import { useDispatch, useSelector } from "react-redux";

export default function Home() {

  const dispatch = useDispatch()

  const {_id,role,firstName} = useSelector(({usersReducer} : UsersReducerProps)=> usersReducer).user
  const {tenants} = useSelector(({tenantsReducer} : TenantsReducerProps)=> tenantsReducer)
  const {maintainers} = useSelector(({maintainersReducer} : MaintainersReducerProps)=> maintainersReducer)
  const {owners} = useSelector(({ownersReducer} : OwnersReducerProps)=> ownersReducer)

  if (role === 'tenant') {
      const data = tenants.filter(({user}) => user._id === _id)[0]
      dispatch(getTenantInfo(data))
      // const tenant = useSelector(({tenantInfoReducer} : TenantInfoReducerProps)=> tenantInfoReducer).tenantInfo

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
               {data && <TenantDashboard tenant={data} />}  
           </div>
        </div>
       );
  } else if (role === 'maintainer') {
    const data = maintainers.filter(({user}) => user._id === _id)[0]
      dispatch(getMaintainerInfo(data))
      // const maintainer = useSelector(({maintainerInfoReducer} : MaintainerInfoReducerProps)=> maintainerInfoReducer).maintainerInfo

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
               {data && <MaintainerDashboard maintainer={data} />}
           </div>
        </div>
       );

    
  } else if (role === 'owner') {    
    const data = owners.filter(({user}) => user._id === _id)[0]
    dispatch(getOwnerInfo(data))
    // const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo

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
             {data && <OwnerDashboard owner={data} />}
             
         </div>
      </div>
     );
    // loadOwnerData(owner)
  } else if (role === 'admin') {

    LoadAdminData()

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
          
      </div>
   </div>
  );
}
}
