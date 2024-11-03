import {configureStore} from "@reduxjs/toolkit"
import { ExpenseReducer } from "../features/expense-tracker/expenseTrackerSlice"
export const store = configureStore({
    reducer:{
        expenseTracker:ExpenseReducer
    }
})