import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    data: null,
}

const loggedInUserSlice = createSlice({
    name: "loggedInUserSlice",
    initialState: INITIAL_STATE,
    reducers: {
        logData: (state) => {
            console.log('Current data in the store:', state.data);
        },
        loginSuccess: (state, action) => {
            const userData = action.payload
            console.log('Reducer updating state with userData:', userData);
            state.data = userData;
            console.log('state.data',state.data)
        },
        logout: (state) => {
            console.log('Reducer logging out user');
            state.data = null;
        },
    },
});

export const { loginSuccess , logout , logData } = loggedInUserSlice.actions;

export default loggedInUserSlice.reducer;
