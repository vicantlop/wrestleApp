import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setUser(state, action) {
            console.log(action.payload)
            state.uid = action.payload;
        }
    }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer