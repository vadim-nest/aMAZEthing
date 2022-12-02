import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user_slice';
import gameReducer from './game_slice';

function saveToLocalStorage(store: any) {
  console.log(store)
  try {
    const serializedStore = JSON.stringify(store);
    window.localStorage.setItem('store', serializedStore);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedStore = window.localStorage.getItem('store');
    if (serializedStore === null) return undefined;
    return JSON.parse(serializedStore);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer
  },
  preloadedState: persistedState,
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;