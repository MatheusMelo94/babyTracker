import { configureStore } from "@reduxjs/toolkit";
import eventoReducer from "../features/eventoSlice";



export const store = configureStore({
    reducer:{
        evento: eventoReducer,
    }
})


