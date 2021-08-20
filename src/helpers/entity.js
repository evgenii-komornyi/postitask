import { generateUUID } from './uuid-generator';

export const addCategory = (state, value) => {
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

    return state;
};

export const addBrand = (state, value, currentId) => {
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

    return state;
};

export const addProduct = (state, value, currentId) => {
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

    return state;
};

const removeProduct = (state, productId, brandId) => {
    const currentBrand = state.entities.brands[brandId];
    currentBrand.products = currentBrand.products.filter(
        item => item !== productId
    );
    state.entities.brands[brandId] = currentBrand;

    delete state.entities.products[productId];

    return state;
};

const removeBrand = (state, categoryId, brandId) => {
    const currentCategory = state.entities.categories[categoryId];
    state.entities.brands[brandId].products.map(product =>
        removeProduct(state, product, brandId)
    );

    currentCategory.brands = currentCategory.brands.filter(
        item => item !== brandId
    );
    state.entities.categories[categoryId] = currentCategory;

    delete state.entities.brands[brandId];

    return state;
};

const removeCategory = (state, categoryId) => {
    state.entities.categories[categoryId].brands.map(brand =>
        removeBrand(state, categoryId, brand)
    );

    state.result = state.result.filter(category => category !== categoryId);

    delete state.entities.categories[categoryId];

    return state;
};

export { removeProduct, removeBrand, removeCategory };
