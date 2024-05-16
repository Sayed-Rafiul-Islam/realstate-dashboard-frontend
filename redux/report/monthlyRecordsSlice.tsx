import {createSlice } from "@reduxjs/toolkit"

const monthlyRecordsJson = typeof window !== "undefined" && localStorage.getItem("monthlyRecords")

const initialState = {
    monthlyRecords : monthlyRecordsJson ? JSON.parse(monthlyRecordsJson) : [],
}



const monthlyRecordsSlice = createSlice({
    name : "monthlyRecords",
    initialState,
    reducers : {
        getMonthlyRecords : (state, {payload}) => {
            state.monthlyRecords = payload
            localStorage.removeItem("monthlyRecords")
            localStorage.setItem("monthlyRecords", JSON.stringify(state.monthlyRecords))
        },
    }
})

export const {getMonthlyRecords} = monthlyRecordsSlice.actions
export default monthlyRecordsSlice.reducer