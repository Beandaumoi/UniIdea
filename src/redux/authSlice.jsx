import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  user: null, // Thêm user để lưu thông tin người dùng (bao gồm avatar)
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.accessToken = action.payload.token;
      state.user = action.payload.user;
    },
    clearUserToken: (state) => {
      state.accessToken = null;
      state.user = null; // Xóa cả token và user khi clear
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserToken, clearUserToken, updateUser } = authSlice.actions;
export default authSlice.reducer;
