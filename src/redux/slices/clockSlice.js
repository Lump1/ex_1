import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentTime: new Date()
};

const clockSlice = createSlice({
    name: "clock",
    initialState,
    reducers: {
        updateTime(state) {
            state.currentTime = new Date();
        }
    }
})

export const { updateTime } = clockSlice.actions;
export default clockSlice.reducer;