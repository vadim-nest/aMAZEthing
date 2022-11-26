import { configureStore, Store } from "@reduxjs/toolkit";
import { useReducer } from "react";

 import counterReducer from './counter-slice'
 import userReducer from './user_slice'


 export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer,
    },
 });

 export type AppDispatch = typeof store.dispatch;
 export type RootState = ReturnType<typeof store.getState>;