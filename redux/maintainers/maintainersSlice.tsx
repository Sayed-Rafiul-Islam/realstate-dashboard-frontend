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
            localStorage.removeItem("maintainers")
            localStorage.setItem("maintainers", JSON.stringify(state.maintainers))
        },
        // updatemaintainerstatus : (state, {payload}) => {
        //     const temp = state.maintainers.filter((item : PropertyProps) => {
        //         if ( item._id  === payload._id) {
        //             item.status = true
        //         }
        //         return item
        //     })
        //     state.maintainers = temp
        //     localStorage.removeItem("maintainers")
        //     localStorage.setItem("maintainers", JSON.stringify(state.maintainers))
        // },

        // addpropertiePackage : (state, {payload}) => {
        //     state.maintainers.push(payload)
        //     console.log(state.maintainers)
        //     localStorage.removeItem("maintainers")
        //     localStorage.setItem("maintainers", JSON.stringify(state.maintainers))
        // },
        removeMaintainer : (state, {payload}) => {
            const temp = state.maintainers.filter(({_id} : MaintainerProps) => _id !== payload._id)
            state.maintainers = temp
            localStorage.removeItem("maintainers")
            localStorage.setItem("maintainers", JSON.stringify(state.maintainers))
        },
    }
})

export const {getMaintainers,removeMaintainer} = maintainersSlice.actions
export default maintainersSlice.reducer