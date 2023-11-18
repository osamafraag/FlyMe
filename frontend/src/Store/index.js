import { configureStore } from "@reduxjs/toolkit";
import loggedInUserSlice from "./Slice/LoggedInUser";


export default configureStore({
  reducer: {
    loggedInUserSlice : loggedInUserSlice
  },
});

