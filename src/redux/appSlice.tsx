import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface appState {
    showModal: boolean;
    sequence: number[];
    currentColor: number;
}

const initialState: appState = {
    showModal: false,
    sequence: [],
    currentColor: -1,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        hideModal: (state) => {
            state.showModal = false
        },
        showModal: (state) => {
            state.showModal = true;
        },
        resetUserSequence: (state) => {
            state.sequence = []
        },
        appendElement: (state, action: PayloadAction<number>) => {
            state.sequence = [...state.sequence, action.payload];
        },
        triggerColor: (state, action: PayloadAction<number>) => {
            state.currentColor = action.payload;
        },
    },
});

export const {
    hideModal,
    showModal,
    appendElement,
    resetUserSequence,
    triggerColor
} = appSlice.actions;

export default appSlice.reducer;
