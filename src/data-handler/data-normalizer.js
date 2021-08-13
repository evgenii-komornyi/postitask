import { schema, normalize } from 'normalizr';

export const normalizeData = data => {
    const product = new schema.Entity('products');

    const brand = new schema.Entity('brands', { products: [product] });

    const category = new schema.Entity('categories', {
        brands: [brand],
    });

    return normalize(data, [category]);
};
