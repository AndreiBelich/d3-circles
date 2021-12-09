import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const regresApi = createApi({
    reducerPath: "regresApi",
    baseQuery: fetchBaseQuery({baseUrl: "https://reqres.in/api/"}),
    endpoints: (build) => ({
        getAllUsers: build.query({
            query: (page = 1) => `users?page=${page}`
        }),
        addUser: build.mutation({
            query: (body) => ({
                url: "users",
                method: "POST",
                body
            })
        })
    })
})

export const { useGetAllUsersQuery, useAddUserMutation } = regresApi;