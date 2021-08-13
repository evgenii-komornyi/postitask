import React, { useState } from 'react';
import produce from 'immer';

import {
    Row,
    Col,
    Button,
    ListGroup,
    ListGroupItem,
    Collapse,
    Input,
} from 'reactstrap';

import data from '../store/InitialData.json';
import { normalizeData } from '../data-handler/data-normalizer';

const Main = () => {
    const normalizedData = normalizeData(data.categories);

    const [state, setState] = useState({
        ids: normalizedData.result,
        categories: normalizedData.entities.categories,
        brands: normalizedData.entities.brands,
        products: normalizedData.entities.products,
    });

    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);

    const [isOpen, setIsOpen] = useState('');
    const toggle = id => {
        if (isOpen === id) {
            setIsOpen('');
        } else {
            setIsOpen(id);
        }
    };

    const [newCategory, setNewCategory] = useState('');
    const [newBrand, setNewBrand] = useState('');
    const [newProduct, setNewProduct] = useState('');

    const removeCategoryById = category_id => {
        const newState = produce(state, draft => {
            draft.categories[category_id].brands.map(brand =>
                draft.brands[brand].products.map(product =>
                    removeProductById(brand, product)
                )
            );
            draft.categories[category_id].brands.map(brand =>
                removeBrandById(category_id, brand)
            );
            draft.ids = draft.ids.filter(category => category !== category_id);
            delete draft.categories[category_id];
        });
        setState(newState);
    };

    const removeBrandById = (category_id, brand_id) => {
        const newState = produce(state, draft => {
            const currentCategory = draft.categories[category_id];
            draft.brands[brand_id].products.map(product =>
                removeProductById(brand_id, product)
            );
            currentCategory.brands = currentCategory.brands.filter(
                item => item !== brand_id
            );
            draft.categories[category_id] = currentCategory;
            delete draft.brands[brand_id];
        });
        setState(newState);
    };

    const removeProductById = (brand_id, product_id) => {
        const newState = produce(state, draft => {
            const currentBrand = draft.brands[brand_id];
            currentBrand.products = currentBrand.products.filter(
                item => item !== product_id
            );
            draft.brands[brand_id] = currentBrand;
            delete draft.products[product_id];
        });
        setState(newState);
    };

    const generateUUID = () => {
        let time = new Date().getTime();

        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            c => {
                const random = (time + Math.random() * 16) % 16 | 0;
                time = Math.floor(time / 16);
                return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16);
            }
        );
        return uuid;
    };

    const onChangeCategoryHandle = e => {
        const { value } = e.target;
        setNewCategory({ id: generateUUID(), name: value, brands: [] });
    };

    const addNewCategory = () => {
        if (newCategory.name) {
            const newState = produce(state, draft => {
                draft.categories = {
                    ...draft.categories,
                    [newCategory.id]: {
                        id: newCategory.id,
                        name: newCategory.name,
                        brands: newCategory.brands,
                    },
                };
                draft.ids = [...draft.ids, newCategory.id];
            });
            setState(newState);

            toggleCategory();
        } else {
            alert('empty field');
        }
        setNewCategory({ id: '', name: '', brands: [] });
    };

    const onChangeBrandHandle = e => {
        const { value } = e.target;
        setNewBrand({ id: generateUUID(), name: value, products: [] });
    };

    const addNewBrand = category_id => {
        if (newBrand.name) {
            const newState = produce(state, draft => {
                draft.brands = {
                    ...draft.brands,
                    [newBrand.id]: {
                        id: newBrand.id,
                        name: newBrand.name,
                        products: newBrand.products,
                    },
                };

                const currentCategory = draft.categories[category_id];
                currentCategory.brands = [
                    ...currentCategory.brands,
                    newBrand.id,
                ];
            });
            setState(newState);

            setIsOpen('');
        } else {
            alert('empty field');
        }
        setNewBrand({ id: '', name: '', products: [] });
    };

    const onChangeProductHandle = e => {
        const { value } = e.target;
        setNewProduct({ id: generateUUID(), name: value });
    };

    const addNewProduct = brand_id => {
        if (newProduct.name) {
            const newState = produce(state, draft => {
                draft.products = {
                    ...draft.products,
                    [newProduct.id]: {
                        id: newProduct.id,
                        name: newProduct.name,
                    },
                };

                const currentBrand = draft.brands[brand_id];

                currentBrand.products = [
                    ...currentBrand.products,
                    newProduct.id,
                ];
            });
            setState(newState);

            setIsOpen('');
        } else {
            alert('empty field');
        }
        setNewProduct({ id: '', name: '' });
    };

    return (
        <>
            <Row>
                <Col>
                    <Button
                        color="success"
                        outline
                        onClick={toggleCategory}
                        style={{ margin: 20 + 'px' }}
                    >
                        +
                    </Button>
                    <Collapse isOpen={isCategoryOpen}>
                        <Input
                            type="text"
                            name="category"
                            placeholder="New category..."
                            value={newCategory.name}
                            onChange={e => onChangeCategoryHandle(e)}
                        />
                        <Button color="primary" onClick={addNewCategory}>
                            Add new category
                        </Button>{' '}
                    </Collapse>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ListGroup>
                        {state.ids &&
                            state.ids.map(category_id => (
                                <ListGroupItem
                                    className="justify-content-between"
                                    color="success"
                                    key={category_id}
                                >
                                    {state.categories[category_id] &&
                                        state.categories[category_id].name}
                                    <Button
                                        color="success"
                                        outline
                                        onClick={() => toggle(category_id)}
                                        style={{
                                            margin: 20 + 'px',
                                        }}
                                    >
                                        +
                                    </Button>
                                    <Collapse isOpen={isOpen === category_id}>
                                        <Input
                                            type="text"
                                            name="brand"
                                            placeholder="New brand..."
                                            value={newBrand.name}
                                            onChange={e =>
                                                onChangeBrandHandle(e)
                                            }
                                        />
                                        <Button
                                            color="primary"
                                            onClick={() =>
                                                addNewBrand(category_id)
                                            }
                                        >
                                            Add new brand
                                        </Button>
                                    </Collapse>
                                    <Button
                                        color="danger"
                                        style={{ margin: 20 + 'px' }}
                                        onClick={() =>
                                            removeCategoryById(category_id)
                                        }
                                    >
                                        X
                                    </Button>

                                    <ListGroup>
                                        {state.categories[category_id] &&
                                            state.categories[
                                                category_id
                                            ].brands.map(brand_id => (
                                                <ListGroupItem
                                                    className="justify-content-between"
                                                    color="info"
                                                    key={brand_id}
                                                >
                                                    {state.brands[brand_id] &&
                                                        state.brands[brand_id]
                                                            .name}{' '}
                                                    <Button
                                                        color="success"
                                                        outline
                                                        onClick={() =>
                                                            toggle(brand_id)
                                                        }
                                                        style={{
                                                            margin: 20 + 'px',
                                                        }}
                                                    >
                                                        +
                                                    </Button>
                                                    <Collapse
                                                        isOpen={
                                                            isOpen === brand_id
                                                        }
                                                    >
                                                        <Input
                                                            type="text"
                                                            name="product"
                                                            placeholder="New product..."
                                                            value={
                                                                newProduct.name
                                                            }
                                                            onChange={e =>
                                                                onChangeProductHandle(
                                                                    e
                                                                )
                                                            }
                                                        />
                                                        <Button
                                                            color="primary"
                                                            onClick={() =>
                                                                addNewProduct(
                                                                    brand_id
                                                                )
                                                            }
                                                        >
                                                            Add new product
                                                        </Button>{' '}
                                                    </Collapse>
                                                    <Button
                                                        color="danger"
                                                        style={{
                                                            margin: 20 + 'px',
                                                        }}
                                                        onClick={() =>
                                                            removeBrandById(
                                                                category_id,
                                                                brand_id
                                                            )
                                                        }
                                                    >
                                                        X
                                                    </Button>
                                                    <ListGroup>
                                                        {state.brands[brand_id]
                                                            .products &&
                                                            state.brands[
                                                                brand_id
                                                            ].products.map(
                                                                product_id => (
                                                                    <ListGroupItem
                                                                        className="justify-content-between"
                                                                        color="warning"
                                                                        key={
                                                                            product_id
                                                                        }
                                                                    >
                                                                        {state
                                                                            .products[
                                                                            product_id
                                                                        ] &&
                                                                            state
                                                                                .products[
                                                                                product_id
                                                                            ]
                                                                                .name}{' '}
                                                                        <Button
                                                                            color="danger"
                                                                            style={{
                                                                                margin:
                                                                                    20 +
                                                                                    'px',
                                                                            }}
                                                                            onClick={() =>
                                                                                removeProductById(
                                                                                    brand_id,
                                                                                    product_id
                                                                                )
                                                                            }
                                                                        >
                                                                            X
                                                                        </Button>
                                                                    </ListGroupItem>
                                                                )
                                                            )}
                                                    </ListGroup>
                                                </ListGroupItem>
                                            ))}
                                    </ListGroup>
                                </ListGroupItem>
                            ))}
                    </ListGroup>
                </Col>
            </Row>
        </>
    );
};

export default Main;
