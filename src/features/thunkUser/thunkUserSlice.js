import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk(
    "users/getUsers",
    async (dispatch, getState) => {
        return await fetch("https://jsonplaceholder.typicode.com/users").then(
            (res) => res.json()
        );
    }
)

const thunkUsersSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        status: null
    },
    extraReducers: {
        [getUsers.pending]: (state, action) => {
            state.status = "loading";
            console.log("Loading step");
        },
        [getUsers.fulfilled] : (state, action) => {
            state.status = "success";
            console.log("Fulfilled action = ", action);
            state.users = action.payload;
        },
        [getUsers.rejected]: (state, action) => {
            state.status = "failed";
            console.log("Fail step");
        }
    }
})

export default thunkUsersSlice.reducer;