import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isFetchAllLoading: false,
  isFetchAllError: false,
  employees: [],
  isCreateLoading: false,
  isCreateError: false,
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
export const createEmployee = createAsyncThunk(
  "/employees/createEmployee",
  async ({employee}, {rejectWithValue}) => {
    try {
      const url = "http://localhost/LSTV/backend/createEmployee.php";
      const formData = new URLSearchParams();
      const {
        fullname,
        gender,
        age,
        birthdate,
        salary,
        isactive,
        address,
        contactnum,
        civilstat,
      } = employee;

      formData.append("fullname", fullname);
      formData.append("gender", gender);
      formData.append("age", age);
      formData.append("birthdate", birthdate);
      formData.append("salary", salary);
      formData.append("isactive", isactive);
      formData.append("address", address);
      formData.append("contactnum", contactnum);
      formData.append("civilstat", civilstat);

      const {data: res} = await axios.post(url, employee, {
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
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
    builder
      .addCase(createEmployee.pending, (state, action) => {
        state.isFetchAllLoading = true;
        state.isFetchAllError = false;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.isFetchAllLoading = false;
        state.isFetchAllError = false;
        // state.employees = [...action.payload];
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.isFetchAllLoading = false;
        state.isFetchAllError = true;
      });
  },
});

export const {} = employeesReducer.actions;

export default employeesReducer.reducer;
