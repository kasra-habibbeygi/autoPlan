import { configureStore } from '@reduxjs/toolkit';
import sideBar from './reducers/sideBar';
import User from './reducers/user';

const store = configureStore({
    reducer: {
        sideBar,
        User
    }
});

export default store;
