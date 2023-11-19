import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    token: null,
}

const Token = createSlice({
    name: "Token",
    initialState: INITIAL_STATE,
    reducers: {
        setToken: (state, action) => {
          console.log('Current data in the store:', action.payload);
          state.token = action.payload
        }
    },
});

export const { setToken } = Token.actions;

export default Token.reducer;
