import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    type: '',
    currentId: '',
};

const reducer = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setIsModalOpen: (state, { payload }) => {
            state = {
                isOpen: !state.isOpen,
                type: payload.type,
                currentId: payload.currentId,
            };
            return state;
        },
    },
});

export const { setIsModalOpen } = reducer.actions;
export const modalReducer = reducer.reducer;
