import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isFetchAllLoading: false,
  isFetchAllError: false,
  employees: [],
  isCreateLoading: false,
  isCreateError: false,
  isAddEmployeeOpen: false,
  displayMessage: "",
  isDisplayMessageOpen: false,
  isDeleteModalOpen: false,
  selectedEmployee: null,
  isEditModalOpen: false,
};

export const getAllEmployees = createAsyncThunk(
  "/employees/getAllEmployees",
  async ({x}, {rejectWithValue}) => {
    try {
      const url = "http://localhost/LSTV/backend/getAllEmployees.php";
      const {data: res} = await axios.get(url);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const createEmployee = createAsyncThunk(
  "/employees/createEmployee",
  async ({employee}, {rejectWithValue}) => {
    try {
      const url = "http://localhost/LSTV/backend/createEmployee.php";

      const {data: res} = await axios.post(url, employee, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteEmployee = createAsyncThunk(
  "/employees/deleteEmployee",
  async ({recid}, {rejectWithValue}) => {
    try {
      const url = "http://localhost/LSTV/backend/deleteEmployee.php";
      const {data: res} = await axios.delete(url, {
        data: {recid}, // Pass the data payload containing recid
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editEmployee = createAsyncThunk(
  "/employees/editEmployee",
  async ({recid, updatedEmployee}, {rejectWithValue}) => {
    try {
      console.log(recid, updatedEmployee);
      const url = "http://localhost/LSTV/backend/editEmployee.php";
      const {data: res} = await axios.put(
        url,
        {
          recid,
          ...updatedEmployee,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const employeesReducer = createSlice({
  name: "employees",
  initialState,
  reducers: {
    handleAddEmployees: (state, action) => {
      state.isAddEmployeeOpen = !state.isAddEmployeeOpen;
    },
    handleRemoveMessage: (state, action) => {
      state.isDisplayMessageOpen = false;
      console.log("testomg");
    },
    handleDeleteModal: (state, action) => {
      state.isDeleteModalOpen = !state.isDeleteModalOpen;
      if (action.payload.employee) {
        const {employee} = action.payload;
        state.selectedEmployee = employee;
      }
    },
    handleEditModal: (state, action) => {
      state.isEditModalOpen = !state.isEditModalOpen;
      if (action.payload.employee) {
        const {employee} = action.payload;
        state.selectedEmployee = employee;
      }
    },
  },
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
        const {employees} = action.payload;
        state.isFetchAllLoading = false;
        state.isFetchAllError = false;
        state.employees = [...employees];
        state.isAddEmployeeOpen = false;
        state.displayMessage = "Employee added successfully";
        state.isDisplayMessageOpen = true;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.isFetchAllLoading = false;
        state.isFetchAllError = true;
        state.displayMessage = "Something went wrong";
        state.isDisplayMessageOpen = true;
      });
    // delete
    builder
      .addCase(deleteEmployee.pending, (state, action) => {
        state.isFetchAllLoading = true;
        state.isFetchAllError = false;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.isFetchAllLoading = false;
        state.isFetchAllError = false;
        state.employees = [...action.payload];
        state.isDeleteModalOpen = false;
        state.displayMessage = "Employee Deleted Successfully";
        state.isDisplayMessageOpen = true;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.isFetchAllLoading = false;
        state.isFetchAllError = true;
        state.isDeleteModalOpen = false;
        state.displayMessage = "Something went wrong";
        state.isDisplayMessageOpen = true;
      });
    // edit
    builder
      .addCase(editEmployee.pending, (state, action) => {
        state.isFetchAllLoading = true;
        state.isFetchAllError = false;
      })
      .addCase(editEmployee.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isFetchAllLoading = false;
        state.isFetchAllError = false;
        state.employees = [...action.payload];
        state.displayMessage = "Employee Updated Successfully";
        state.isDisplayMessageOpen = true;
        state.isEditModalOpen = false;
      })
      .addCase(editEmployee.rejected, (state, action) => {
        state.isFetchAllLoading = false;
        state.isFetchAllError = true;
        state.displayMessage = "Something went wrong";
        state.isDisplayMessageOpen = true;
        state.isEditModalOpen = false;
      });
  },
});

export const {
  handleAddEmployees,
  handleRemoveMessage,
  handleDeleteModal,
  handleEditModal,
} = employeesReducer.actions;

export default employeesReducer.reducer;
