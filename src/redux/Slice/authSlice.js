import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    email: null,
    userName: null,
    userId: null
}

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      const {email, userName, userId} = action.payload;
        state.isLoggedIn = true;
        state.email = email;
        state.userId = userId;
        state.userName = userName;
    },
    removeActiveUser:(state,action) =>{
      state.isLoggedIn = false;
        state.email = null;
        state.userId = null;
        state.userName = null;
    }
  }
});

export const {setActiveUser, removeActiveUser} = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectEmail = (state) => state.auth.email
export const selectUserName = (state) => state.auth.userName
export const selectUserId = (state) => state.auth.userId

export default authSlice.reducer