import { configureStore, createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { user: "" },
  reducers: {
    onLogin(state, action) {
      state.user = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(state.user));
    },
    onLogout(state) {
      swal("Đăng xuất thành công", "Bạn đã đăng xuất tài khoản", "success");
      state.user = "";
      localStorage.removeItem("currentUser");
    },
  },
});

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
