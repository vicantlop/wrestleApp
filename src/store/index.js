import { configureStore } from "@reduxjs/toolkit";
import attendanceReducer from './attendanceSlice';
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        attendance: attendanceReducer,
    }
})