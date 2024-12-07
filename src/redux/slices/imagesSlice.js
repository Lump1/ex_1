import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    urlArray: []
};

const imagesSlice = createSlice({
    name: "images",
    initialState,
    reducers: {
        uploadImage(state, action) {
            state.urlArray.push(action.payload);
        }
    }
})

export const { uploadImage } = imagesSlice.actions;
export default imagesSlice.reducer;