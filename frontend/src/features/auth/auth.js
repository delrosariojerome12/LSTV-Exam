import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoginError: false,
  isLoginLoading: false,
  user: null,
};

export const handleLogin = createAsyncThunk(
  "/user/login",
  async ({user}, rejectWithValue) => {
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
      console.log(res);
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleLogin.pending, (state, action) => {
      state.isLoginLoading = true;
      state.isLoginError = false;
    });
    builder.addCase(handleLogin.fulfilled, (state, action) => {
      state.isLoginLoading = false;
      state.isLoginError = false;
    });
    builder.addCase(handleLogin.rejected, (state, action) => {
      state.isLoginLoading = false;
      state.isLoginError = true;
    });
  },
});

export const {} = authReducer.actions;

export default authReducer.reducer;
