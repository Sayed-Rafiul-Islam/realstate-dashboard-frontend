import { MaintainerProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const maintainersJson = typeof window !== "undefined" && window.localStorage.getItem("maintainers")

const initialState = {
    maintainers : maintainersJson ? JSON.parse(maintainersJson) : [],
}



const maintainersSlice = createSlice({
    name : "maintainers",
    initialState,
    reducers : {
        getMaintainers : (state, {payload}) => {
            state.maintainers = payload
            window.localStorage.removeItem("maintainers")
            window.localStorage.setItem("maintainers", JSON.stringify(state.maintainers))
        },
        updateMaintainer : (state, {payload}) => {
            const temp = state.maintainers.filter((item : MaintainerProps) => {
                if (item._id === payload._id) {
                    item.name = payload.name,
                    item.email = payload.email,
                    item.phone = payload.phone,
                    item.type = payload.type
                }
                return item
            })

            console.log(temp)
            state.maintainers = temp
            window.localStorage.removeItem("tenants")
            window.localStorage.setItem("tenants", JSON.stringify(state.maintainers))
        },

        // addTenant : (state, {payload} ) => {
        //     const {propertyFile, personalFile, ...rest} = payload 
        //     const data = {...rest, _id : '5'}
        //     state.tenants.push(data)
        //     window.localStorage.removeItem("tenants")
        //     window.localStorage.setItem("tenants", JSON.stringify(state.tenants))
        // },

        addMaintainer : (state, {payload}) => {
            const data = {...payload,_id : '5'}
            state.maintainers.push(data)
            // console.log(state.maintainers)
            window.localStorage.removeItem("maintainers")
            window.localStorage.setItem("maintainers", JSON.stringify(state.maintainers))
        },
        removeMaintainer : (state, {payload}) => {
            const temp = state.maintainers.filter(({_id} : MaintainerProps) => _id !== payload._id)
            state.maintainers = temp
            window.localStorage.removeItem("maintainers")
            window.localStorage.setItem("maintainers", JSON.stringify(state.maintainers))
        },
    }
})

export const {getMaintainers,removeMaintainer,addMaintainer,updateMaintainer} = maintainersSlice.actions
export default maintainersSlice.reducer