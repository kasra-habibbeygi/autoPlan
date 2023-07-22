import { createSlice } from '@reduxjs/toolkit';

const User = createSlice({
    name: 'User',
    initialState: {
        isLoggedIn: localStorage.getItem('AutoPlaningToken') !== null ? true : false,
        info: {
            id: '',
            fullname: '',
            mobile_number: '',
            company_phone: '',
            company_address: '',
            company_code: '',
            company_name: '',
            role: '',
            permission: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]
        }
    },
    reducers: {
        loginStatusHandler: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        infoHandler: (state, action) => {
            state.info = action.payload;
        }
    }
});

export const { loginStatusHandler, infoHandler } = User.actions;
export default User.reducer;
