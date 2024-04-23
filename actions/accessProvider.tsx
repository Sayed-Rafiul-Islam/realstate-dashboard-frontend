"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import api from "./api"
import { useDispatch } from "react-redux"
import { addUser } from "@/redux/auth/authSlice"

export default function AccessProvider(path : string) {
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(()=>{
        const varify = async () => {
          const access = localStorage.getItem("accessToken")
          if (access) {
            const {data,status} = await api.get(`varify?accessToken=${access}`)
            dispatch(addUser(data))
            if (status === 401 || status === 403 || status === 500 || status === 503 || status === 205) {
              router.push('/authentication')
              localStorage.removeItem('role')
              localStorage.removeItem('accessToken')
            }
            else {
              if ( path === '/addmonthly' || path === '/monthly' || path === '/accessmanagement') {
                if (data.role === 'superAdmin' || data.role === 'supremeAdmin') {
                  // do nothing
                } else {
                  router.push('/')
                }
              }
            localStorage.setItem('role',data.role)
            }

          }
          
          else {
            router.push('/authentication')
          }
        }
        varify()
      },[])
      
}
