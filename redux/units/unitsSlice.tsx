
import {createSlice } from "@reduxjs/toolkit"

const unitsJson = typeof window !== "undefined" && localStorage.getItem("units")

const initialState = {
    units : unitsJson ? JSON.parse(unitsJson) : [],
}



const unitsSlice = createSlice({
    name : "units",
    initialState,
    reducers : {
        getUnits : (state, {payload}) => {
            state.units = payload
            localStorage.removeItem("units")
            localStorage.setItem("units", JSON.stringify(state.units))
        },
        // updateunitstatus : (state, {payload}) => {
        //     const temp = state.units.filter((item : PropertyProps) => {
        //         if ( item._id  === payload._id) {
        //             item.status = true
        //         }
        //         return item
        //     })
        //     state.units = temp
        //     localStorage.removeItem("units")
        //     localStorage.setItem("units", JSON.stringify(state.units))
        // },

        // addpropertiePackage : (state, {payload}) => {
        //     state.units.push(payload)
        //     console.log(state.units)
        //     localStorage.removeItem("units")
        //     localStorage.setItem("units", JSON.stringify(state.units))
        // },
        // removePackage : (state, {payload}) => {
        //     const temp = state.packages.filter(({_id} : PackageProps) => _id !== payload._id)
        //     state.packages = temp
        //     localStorage.removeItem("packages")
        //     localStorage.setItem("packages", JSON.stringify(state.packages))
        // },
    }
})

export const {getUnits} = unitsSlice.actions
export default unitsSlice.reducer