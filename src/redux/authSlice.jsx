import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  user: null, // Thêm user để lưu thông tin người dùng (bao gồm avatar)
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload.token; // Lấy token từ payload
      state.user = action.payload.user; // Lấy user từ payload
    },
    clearToken: (state) => {
      state.accessToken = null;
      state.user = null; // Xóa cả token và user khi clear
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
