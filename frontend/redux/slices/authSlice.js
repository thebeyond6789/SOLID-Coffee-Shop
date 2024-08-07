import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Trạng thái ban đầu của slice auth
const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Hàm tạo các thunk cho các hành động xác thực (login, register)
const createAuthThunk = (type, url) =>
  createAsyncThunk(type, async (credentials, { rejectWithValue }) => {
    try {
      // Gửi yêu cầu HTTP POST tới API với thông tin đăng nhập/đăng ký
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      // Kiểm tra nếu phản hồi không thành công, trả về lỗi
      if (!response.ok)
        return rejectWithValue(data.message || `${type} failed`);

      // Nếu đăng nhập thành công, trả về token và thông tin người dùng
      // Nếu đăng ký thành công, trả về userId
      return type === "auth/login"
        ? { token: data.token, user: data.user }
        : data.userId;
    } catch (error) {
      // Bắt lỗi nếu có sự cố trong quá trình gửi yêu cầu
      return rejectWithValue("An error occurred. Please try again.");
    }
  });

// Thunk cho hành động đăng nhập
export const loginUser = createAuthThunk("auth/login", "/users/login");
// Thunk cho hành động đăng ký
export const registerUser = createAuthThunk("auth/register", "/users/register");

// Tạo slice auth
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Hành động logout, đưa trạng thái về giá trị ban đầu
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Xử lý trạng thái pending cho các hành động
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      // Xử lý trạng thái rejected cho các hành động
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      // Xử lý trạng thái fulfilled cho hành động login
      .addMatcher(
        (action) => action.type === loginUser.fulfilled.type,
        (state, action) => {
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.isAuthenticated = true;
          state.loading = false;
          state.error = null;
        }
      )
      // Xử lý trạng thái fulfilled cho hành động register
      .addMatcher(
        (action) => action.type === registerUser.fulfilled.type,
        (state) => {
          state.loading = false;
          state.error = null;
        }
      );
  },
});

// Xuất hành động logout
export const { logout } = authSlice.actions;

// Xuất reducer của slice auth
export default authSlice.reducer;
