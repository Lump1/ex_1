import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    logoUrl: "./images/ff26efc7cf45a17a3622d0add92b15d5.jpg"
};

const logoSlice = createSlice({
    name: "logo",
    initialState,
    reducers: {
        setLogo(state, action) {
            state.logoUrl = action.payload;
        }
    }
})

export const { setLogo } = logoSlice.actions;
export default logoSlice.reducer;