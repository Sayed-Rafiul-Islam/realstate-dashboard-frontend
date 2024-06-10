import { MaintainerProps } from "@/types"
import {createSlice } from "@reduxjs/toolkit"

const ownerMaintainersJson = typeof window !== "undefined" && localStorage.getItem("ownerMaintainers")

const initialState = {
    ownerMaintainers : ownerMaintainersJson ? JSON.parse(ownerMaintainersJson) : [],
}



const ownerMaintainersSlice = createSlice({
    name : "ownerMaintainers",
    initialState,
    reducers : {
        getOwnerMaintainers : (state, {payload}) => {
            state.ownerMaintainers = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerMaintainers")
                localStorage.setItem("ownerMaintainers", JSON.stringify(state.ownerMaintainers))
            }
        },
        updateOwnerMaintainer : (state, {payload}) => {
            const index = state.ownerMaintainers.findIndex((item : MaintainerProps) => item._id === payload._id)
            state.ownerMaintainers[index] = payload
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerMaintainers")
                localStorage.setItem("ownerMaintainers", JSON.stringify(state.ownerMaintainers))
            }
        },

        addOwnerMaintainer : (state, {payload}) => {
            const data = {...payload,_id : '5'}
            state.ownerMaintainers.push(data)
            // console.log(state.ownerMaintainers)
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerMaintainers")
                localStorage.setItem("ownerMaintainers", JSON.stringify(state.ownerMaintainers))
            }
        },
        removeOwnerMaintainer : (state, {payload}) => {
            const temp = state.ownerMaintainers.filter(({_id} : MaintainerProps) => _id !== payload._id)
            state.ownerMaintainers = temp
            if (typeof window !== 'undefined') {
                localStorage.removeItem("ownerMaintainers")
                localStorage.setItem("ownerMaintainers", JSON.stringify(state.ownerMaintainers))
            }
        },
    }
})

export const {getOwnerMaintainers,removeOwnerMaintainer,addOwnerMaintainer,updateOwnerMaintainer} = ownerMaintainersSlice.actions
export default ownerMaintainersSlice.reducer