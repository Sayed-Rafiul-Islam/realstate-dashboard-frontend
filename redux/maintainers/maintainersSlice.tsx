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
            const index = state.maintainers.findIndex((item : MaintainerProps) => item._id === payload._id)
            state.maintainers[index] = payload
            if (typeof window !== 'undefined') {
                    localStorage.removeItem("maintainers")
                    localStorage.setItem("maintainers", JSON.stringify(state.maintainers))
                }
        },
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