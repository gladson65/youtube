
import { createSlice } from "@reduxjs/toolkit";

const reactionSlice = createSlice({
    name: "reaction",
    initialState: {
        value: 0,
    },

    reducers: {

        increament: (state, action) => {
            state.value += action.payload;
        },

        decreament: (state, action) => {
            state.value -= action.payload;
        }
    }
})

export const { increament, decreament } = reactionSlice.actions;
export default reactionSlice.reducer;