import {configureStore} from "@reduxjs/toolkit";
import auth from "./features/auth/auth";
import employees from "./features/employees/employees";

export const store = configureStore({
  reducer: {
    auth,
    employees,
  },
});
