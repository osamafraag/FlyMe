import { configureStore } from "@reduxjs/toolkit";
import loggedInUserSlice from "./Slice/LoggedInUser";
import Token from "./Slice/Token";


export default configureStore({
  reducer: {
    loggedInUserSlice : loggedInUserSlice,
    Token: Token
  },
});

