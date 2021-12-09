import { configureStore } from "@reduxjs/toolkit";
import {setupListeners } from "@reduxjs/toolkit/query";
import counterReducer from "../features/counter/counterSlice"
import usersThunkReducer from "../features/thunkUser/thunkUserSlice";
import { pokemonApi } from "../services/pokemon";
import { regresApi } from "../services/regres";


const store = configureStore({
    reducer: {
        counter: counterReducer,
        users: usersThunkReducer,
        [pokemonApi.reducerPath] : pokemonApi.reducer,
        [regresApi.reducerPath]: regresApi.reducer
    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware).concat(regresApi.middleware),
});

setupListeners(store.dispatch);

export default store;