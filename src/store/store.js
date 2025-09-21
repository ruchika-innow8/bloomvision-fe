// src/store/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import organisationReducer from "./slices/organisationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    organisation: organisationReducer,
  },
});

export default store;
