import { configureStore } from "@reduxjs/toolkit";

import userReducer from './user_slice';
import gameReducer from './game_slice';


export const store = configureStore({
reducer: {
    user: userReducer,
    game: gameReducer
},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;