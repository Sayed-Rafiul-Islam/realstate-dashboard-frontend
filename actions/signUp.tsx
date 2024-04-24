"use server"

import api from "./api"

export const signUp = async (user_name: string, password: string,role : string) => {
    const {data,status} = await api.post(`createUser`,{user_name,password,role},{validateStatus: () => true})
    return {data,status}

}
