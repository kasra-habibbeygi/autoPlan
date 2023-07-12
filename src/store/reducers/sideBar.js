import { createSlice } from '@reduxjs/toolkit';

const sideBarStatus = createSlice({
    name: 'sideBarStatus',
    initialState: false,
    reducers: {
        openSideBar: () => {
            return true;
        },

        closeSideBar: () => {
            return false;
        },

        toggleSideBar: state => {
            return !state;
        }
    }
});

export const { openSideBar, closeSideBar, toggleSideBar } = sideBarStatus.actions;
export default sideBarStatus.reducer;
