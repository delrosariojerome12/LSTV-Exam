import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isFetchAllLoading: false,
  isFetchAllError: false,
  employees: [],
};

export const getAllEmployees = createAsyncThunk(
  "/employees/getAllEmployees",
  async ({x}, {rejectWithValue}) => {
    try {
      const url = "http://localhost/LSTV/backend/getAllEmployees.php";
      const {data: res} = await axios.get(url);
      return res;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const employeesReducer = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all employees
    builder
      .addCase(getAllEmployees.pending, (state, action) => {
        state.isFetchAllLoading = true;
        state.isFetchAllError = false;
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.isFetchAllLoading = false;
        state.isFetchAllError = false;
        state.employees = [...action.payload];
      })
      .addCase(getAllEmployees.rejected, (state, action) => {
        state.isFetchAllLoading = false;
        state.isFetchAllError = true;
      });
  },
});

export const {} = employeesReducer.actions;

export default employeesReducer.reducer;
