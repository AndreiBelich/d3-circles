import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },

        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
        reset: (state) => {
            state.value = initialState.value
        },
        magicNumber: (state) => {
            state.value = Math.floor(Math.random() * 100 + 1);
        }
    }
});

export const { increment, decrement, incrementByAmount, reset, magicNumber} = counterSlice.actions;

export default counterSlice.reducer;