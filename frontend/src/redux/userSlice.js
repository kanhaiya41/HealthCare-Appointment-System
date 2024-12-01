import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        selected: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setSeleted: (state, action) => {
            state.selected = action.payload;
        }
    }
});

export const { setUser, setSeleted } = userSlice.actions;
export default userSlice.reducer;