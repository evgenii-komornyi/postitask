import { createSlice } from '@reduxjs/toolkit';

import data from '../InitialData.json';
import { normalizeData } from '../../helpers/data-normalizer';
import {
    addCategory,
    addBrand,
    addProduct,
    removeProduct,
    removeBrand,
    removeCategory,
} from '../../helpers/entity';

const initialState = normalizeData(data.categories);

const reducer = createSlice({
    name: 'entities',
    initialState,
    reducers: {
        addEntity: (state, { payload: { value, type, currentId } }) => {
            if (type === 'category') {
                state = addCategory(state, value);
            } else if (type === 'brand') {
                state = addBrand(state, value, currentId);
            } else if (type === 'product') {
                state = addProduct(state, value, currentId);
            } else {
                alert('I do not know what do you want from me');
            }
            return state;
        },
        removeEntity: (
            state,
            { payload: { type, brandId, productId, categoryId } }
        ) => {
            if (type === 'category') {
                state = removeCategory(state, categoryId);
            } else if (type === 'brand') {
                state = removeBrand(state, categoryId, brandId);
            } else if (type === 'product') {
                state = removeProduct(state, productId, brandId);
            } else {
                alert('I do not know what do you want from me');
            }
            return state;
        },
    },
});

export const { addEntity, removeEntity } = reducer.actions;
export const entityReducer = reducer.reducer;
