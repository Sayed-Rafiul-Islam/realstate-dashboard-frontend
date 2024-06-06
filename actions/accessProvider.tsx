"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import api from "./api"
import { useDispatch, useSelector } from "react-redux"
import { addUser, removeUser } from "@/redux/auth/authSlice"
import { TenantsReducerProps } from "@/types"
import { getTenantInfo } from "@/redux/info/tenantInfoSlice"

export default function AccessProvider() {
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(()=>{
        const varify = async () => {
          const access = localStorage.getItem("accessToken")
          if (access) {
            const {data,status} = await api.get(`varify?accessToken=${access}`,{validateStatus: () => true})
            dispatch(addUser(data))
            if (status === 401 || status === 403 || status === 500) {
              router.push('/authentication')
              dispatch(removeUser())
            }
          }
          else {
            dispatch(removeUser())
            router.push('/authentication')
          }
        }
        varify()
      },[])
      
}


