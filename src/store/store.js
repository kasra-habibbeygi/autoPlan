import { configureStore } from '@reduxjs/toolkit';
import sideBar from './reducers/sideBar';

const store = configureStore({
    reducer: {
        sideBar
    }
});

export default store;
