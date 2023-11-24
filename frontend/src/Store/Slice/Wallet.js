import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  wallet: 0
}

const Wallet = createSlice({
    name: "Wallet",
    initialState: INITIAL_STATE,
    reducers: {
      SetWallet: (state, action) => {
        console.log('Current Data In Wallet:', action.payload);
        state.wallet = action.payload
      },
      // setPenddingBalance: (state, action) => {
      //   console.log('Current Pendding Balance:', action.payload);
      //   state.penddingBalance = action.payload
      // },
      // setWithrawal: (state, action) => {
      //   console.log('Current Withdrawal:', action.payload);
      //   state.withdrawal = action.payload
      // }
    },
});

export const { SetWallet } = Wallet.actions;

export default Wallet.reducer;
