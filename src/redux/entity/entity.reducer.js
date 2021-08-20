import { createSlice } from '@reduxjs/toolkit';

import data from '../InitialData.json';
import { normalizeData } from '../../helpers/data-normalizer';
import { generateUUID } from '../../helpers/uuid-generator';

const initialState = normalizeData(data.categories);

const reducer = createSlice({
    name: 'entities',
    initialState,
    reducers: {
        addEntity: (state, { payload: { value, type, currentId } }) => {
            if (type === 'category') {
                const category_id = generateUUID();

                state.entities.categories = {
                    ...state.entities.categories,
                    [category_id]: {
                        id: category_id,
                        name: value,
                        brands: [],
                    },
                };
                state.result = [...state.result, category_id];
            } else if (type === 'brand') {
                const brand_id = generateUUID();

                state.entities.brands = {
                    ...state.entities.brands,
                    [brand_id]: {
                        id: brand_id,
                        name: value,
                        products: [],
                    },
                };

                const currentCategory = state.entities.categories[currentId];
                currentCategory.brands = [...currentCategory.brands, brand_id];
            } else if (type === 'product') {
                const product_id = generateUUID();

                state.entities.products = {
                    ...state.entities.products,
                    [product_id]: {
                        id: product_id,
                        name: value,
                    },
                };

                const currentBrand = state.entities.brands[currentId];

                currentBrand.products = [...currentBrand.products, product_id];
            } else {
                alert('I do not know what you want from me');
            }
            return state;
        },
        removeProduct: (state, { payload: { brandId, productId } }) => {
            const currentBrand = state.entities.brands[brandId];
            currentBrand.products = currentBrand.products.filter(
                item => item !== productId
            );
            state.entities.brands[brandId] = currentBrand;

            delete state.entities.products[productId];

            return state;
        },
        removeBrand: (state, { payload: { categoryId, brandId } }) => {
            const currentCategory = state.entities.categories[categoryId];
            state.entities.brands[brandId].products.map(product =>
                removeProduct(brandId, product)
            );

            currentCategory.brands = currentCategory.brands.filter(
                item => item !== brandId
            );
            state.entities.categories[categoryId] = currentCategory;

            delete state.entities.brands[brandId];

            return state;
        },
        removeCategory: (state, { payload }) => {
            state.entities.categories[payload].brands.map(brand =>
                state.entities.brands[brand].products.map(product =>
                    removeProduct(brand, product)
                )
            );

            state.entities.categories[payload].brands.map(brand =>
                removeBrand(payload, brand)
            );

            state.result = state.result.filter(
                category => category !== payload
            );

            delete state.entities.categories[payload];

            return state;
        },
    },
});

export const { addEntity, removeProduct, removeBrand, removeCategory } =
    reducer.actions;
export const entityReducer = reducer.reducer;
