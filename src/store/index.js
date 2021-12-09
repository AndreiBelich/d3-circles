import { configureStore } from "@reduxjs/toolkit";
import {setupListeners } from "@reduxjs/toolkit/query";
import counterReducer from "../features/counter/counterSlice"

import { pokemonApi } from "../services/pokemon";
import { regresApi } from "../services/regres";


const store = configureStore({
    reducer: {
        counter: counterReducer,
        [pokemonApi.reducerPath] : pokemonApi.reducer,
        [regresApi.reducerPath]: regresApi.reducer
    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);

export default store;