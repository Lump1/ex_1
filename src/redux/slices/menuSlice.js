import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    menuArray: [{text: "someText1"}, 
        {text: "someText2", url: "https://music.youtube.com/watch?v=y88PeNOXS9I&si=CZWXtxhoeOINhLCG"}, 
        {text: "someText3", url: `${window.location.href}documentation`}]
};

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        addMenuElement(state, action) {
            state.menuArray.push(action.payload);
        },
        popMenuElement(state) {
            return state.menuArray.pop();
        }
    }
})

export const { addMenuElement, popMenuElement } = menuSlice.actions;
export default menuSlice.reducer;