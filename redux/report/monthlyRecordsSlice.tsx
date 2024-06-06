import {createSlice } from "@reduxjs/toolkit"

const monthlyRecordsJson = typeof window !== "undefined" && window.localStorage.getItem("monthlyRecords")

const initialState = {
    monthlyRecords : monthlyRecordsJson ? JSON.parse(monthlyRecordsJson) : [],
}



const monthlyRecordsSlice = createSlice({
    name : "monthlyRecords",
    initialState,
    reducers : {
        getMonthlyRecords : (state, {payload}) => {
            state.monthlyRecords = payload
            window.localStorage.removeItem("monthlyRecords")
            window.localStorage.setItem("monthlyRecords", JSON.stringify(state.monthlyRecords))
        },
    }
})

export const {getMonthlyRecords} = monthlyRecordsSlice.actions
export default monthlyRecordsSlice.reducer