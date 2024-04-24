"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import api from "./api"
import { useDispatch } from "react-redux"
import { addUser, removeUser } from "@/redux/auth/authSlice"

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
              localStorage.removeItem('role')
              localStorage.removeItem('accessToken')
            }
            else {
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
