import { configureStore } from "@reduxjs/toolkit";
import loggedInUserSlice from "./Slice/LoggedInUser";
import Token from "./Slice/Token";
import Notifications from "./Slice/Notifications";
import Wallet from "./Slice/Wallet";

export default configureStore({
  reducer: {
    loggedInUserSlice : loggedInUserSlice,
    Token: Token,
    Notifications: Notifications,
    Wallet: Wallet
  },
});

