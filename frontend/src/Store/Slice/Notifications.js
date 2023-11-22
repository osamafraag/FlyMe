import { counter } from "@fortawesome/fontawesome-svg-core";
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  notifications: [],
  unread: [],
  read: [],
  counter: 0
}

const Notifications = createSlice({
  name: "Notifications",
  initialState: INITIAL_STATE,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload
    },
    setUnread: (state, action) => {
      state.unread = action.payload
      state.counter = action.payload.length
    },
    setRead: (state, action) => {
      state.read = action.payload
    },
    setCounter: (state, action) => {
      state.counter = action.payload
    },
  },
});

export const { setNotifications, setUnread, setRead,setCounter } = Notifications.actions;

export default Notifications.reducer;
