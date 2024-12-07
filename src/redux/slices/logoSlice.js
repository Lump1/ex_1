import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    logoUrl: "./images/pngwing.png"
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