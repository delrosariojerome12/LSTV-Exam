import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoginError: false,
  isLoginLoading: false,
  user: null,
  statusMessage: null,
};

export const handleLogin = createAsyncThunk(
  "/user/login",
  async ({user}, {rejectWithValue}) => {
    try {
      const url = "http://localhost/LSTV/backend/login.php";
      const formData = new URLSearchParams();
      const {username, password} = user;
      formData.append("username", username);
      formData.append("password", password);

      const {data: res} = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      // Handle signup error and state updates here
      return rejectWithValue(error.message);
    }
  }
);

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleUserActive: (state, action) => {
      state.user = localStorage.getItem("token");
    },
    handleClearUserStatus: (state, action) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // login
    builder
      .addCase(handleLogin.pending, (state, action) => {
        state.isLoginLoading = true;
        state.isLoginError = false;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        const {username, message} = action.payload;
        console.log(message);
        state.isLoginLoading = false;
        state.isLoginError = false;
        state.user = username;
        localStorage.setItem("token", username);
        // state.statusMessage =
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.isLoginError = true;
      });
  },
});

export const {handleUserActive, handleClearUserStatus} = authReducer.actions;

export default authReducer.reducer;
