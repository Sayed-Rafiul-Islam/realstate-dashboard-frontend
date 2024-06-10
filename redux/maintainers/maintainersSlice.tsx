import { MaintainerProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const maintainersJson = typeof window !== "undefined" && localStorage.getItem("maintainers")

const initialState = {
    maintainers : maintainersJson ? JSON.parse(maintainersJson) : [],
}



const maintainersSlice = createSlice({
    name : "maintainers",
    initialState,
    reducers : {
        getMaintainers : (state, {payload}) => {
            state.maintainers = payload
            if (typeof window !== 'undefined') {
            localStorage.removeItem("maintainers")
            localStorage.setItem("maintainers", JSON.stringify(state.maintainers))
            }
        },
        updateMaintainer : (state, {payload}) => {
            const temp = state.maintainers.filter((item : MaintainerProps) => {
                if (item._id === payload._id) {
                    item.name = payload.name,
                    item.email = payload.email,
                    item.contactNo = payload.contactNo,
                    item.type = payload.type
                }
                return item
            })

            console.log(temp)
            state.maintainers = temp
            localStorage.removeItem("tenants")
            localStorage.setItem("tenants", JSON.stringify(state.maintainers))
        },

        // addTenant : (state, {payload} ) => {
        //     const {propertyFile, personalFile, ...rest} = payload 
        //     const data = {...rest, _id : '5'}
        //     state.tenants.push(data)
        //     localStorage.removeItem("tenants")
        //     localStorage.setItem("tenants", JSON.stringify(state.tenants))
        // },

        addMaintainer : (state, {payload}) => {
            const data = {...payload,_id : '5'}
            state.maintainers.push(data)
            // console.log(state.maintainers)
            if (typeof window !== 'undefined') {
            localStorage.removeItem("maintainers")
            localStorage.setItem("maintainers", JSON.stringify(state.maintainers))
            }
        },
        removeMaintainer : (state, {payload}) => {
            const temp = state.maintainers.filter(({_id} : MaintainerProps) => _id !== payload._id)
            state.maintainers = temp
            if (typeof window !== 'undefined') {
            localStorage.removeItem("maintainers")
            localStorage.setItem("maintainers", JSON.stringify(state.maintainers))
            }
        },
    }
})

export const {getMaintainers,removeMaintainer,addMaintainer,updateMaintainer} = maintainersSlice.actions
export default maintainersSlice.reducer