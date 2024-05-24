"use server"

import api from "./api"

export const signUp = async (email: string, password: string,role : string) => {
    const {data,status} = await api.post(`createUser`,{email,password,role},{validateStatus: () => true})
    return {data,status}

}
