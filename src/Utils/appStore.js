import { configureStore } from '@reduxjs/toolkit';
import reactionReducer from './reactionSlice.js';

const appStore = configureStore({
    reducer: {
        reaction: reactionReducer,
    }
})

export default appStore;