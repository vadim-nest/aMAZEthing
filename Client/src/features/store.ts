import { configureStore, Store } from "@reduxjs/toolkit";
import { useReducer } from "react";

 import userReducer from './user_slice'


 export const store = configureStore({
    reducer: {
        user: userReducer,
    },
 });

 export type AppDispatch = typeof store.dispatch;
 export type RootState = ReturnType<typeof store.getState>;