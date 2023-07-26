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
            permission: [],
            calculate_hours: {
                hours: 0,
                minutes: 0
            }
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
