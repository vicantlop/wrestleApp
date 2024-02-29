import { createSlice } from "@reduxjs/toolkit"

const attendanceSlice = createSlice({
    name: 'attendance',
    initialState: {},
    reducers: {
        markPresent(state, action) {
            state[action.payload.date] = {
                    type: 'present'
                }
        }
    }
})

export const { markPresent } = attendanceSlice.actions
export default attendanceSlice.reducer