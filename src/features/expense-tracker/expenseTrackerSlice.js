import {createSlice} from "@reduxjs/toolkit";
const initialState={
    text:""
}

export const expenseTrackerSlice = createSlice({
    name:"expense-tracker",
    initialState,
    reducers:{
        changeText:(state,action)=>{
            state.text = action.payload;
        }
    }
})

export const {changeText} = expenseTrackerSlice.actions
export const ExpenseReducer =   expenseTrackerSlice.reducer 