import React, { useState } from 'react';
import {
    Row,
    Col,
    Button,
    ListGroup,
    ListGroupItem,
    Collapse,
    Input,
} from 'reactstrap';

import data from '../data/data.json';

const Main = () => {
    const [categories, setCategories] = useState(data.categories);

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

    const removeCategoryById = id => {
        const newData = categories.filter(item => item.id !== id);
        setCategories(newData);
    };

    const removeBrandById = id => {
        const newData = categories.map(category => ({
            ...category,
            brands: category.brands.filter(item => item.id !== id),
        }));
        setCategories(newData);
    };

    const removeProductById = id => {
        const newData = categories.map(category => ({
            ...category,
            brands: category.brands.map(brand => ({
                ...brand,
                products: brand.products.filter(item => item.id !== id),
            })),
        }));
        setCategories(newData);
    };

    const generateUUID = () => {
        let d = new Date().getTime();

        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            c => {
                const r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
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
            categories.push(newCategory);
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

    const addNewBrand = categoryIndex => {
        if (newBrand.name) {
            categories[categoryIndex].brands.push(newBrand);
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

    const addNewProduct = (categoryIndex, brandIndex) => {
        if (newProduct.name) {
            categories[categoryIndex].brands[brandIndex].products.push(
                newProduct
            );
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
                        {categories.map((category, cat_index) => (
                            <ListGroupItem
                                className="justify-content-between"
                                color="success"
                                key={category.id}
                            >
                                {category.name}
                                <Button
                                    color="success"
                                    outline
                                    onClick={() => toggle(category.id)}
                                    style={{
                                        margin: 20 + 'px',
                                    }}
                                >
                                    +
                                </Button>
                                <Collapse isOpen={isOpen === category.id}>
                                    <Input
                                        type="text"
                                        name="brand"
                                        placeholder="New brand..."
                                        value={newBrand.name}
                                        onChange={e => onChangeBrandHandle(e)}
                                    />
                                    <Button
                                        color="primary"
                                        onClick={() => addNewBrand(cat_index)}
                                    >
                                        Add new brand
                                    </Button>
                                </Collapse>
                                <Button
                                    color="danger"
                                    style={{ margin: 20 + 'px' }}
                                    onClick={() =>
                                        removeCategoryById(category.id)
                                    }
                                >
                                    X
                                </Button>

                                <ListGroup>
                                    {category.brands.map(
                                        (brand, brand_index) => (
                                            <ListGroupItem
                                                className="justify-content-between"
                                                color="info"
                                                key={brand.id}
                                            >
                                                {brand.name}{' '}
                                                <Button
                                                    color="success"
                                                    outline
                                                    onClick={() =>
                                                        toggle(brand.id)
                                                    }
                                                    style={{
                                                        margin: 20 + 'px',
                                                    }}
                                                >
                                                    +
                                                </Button>
                                                <Collapse
                                                    isOpen={isOpen === brand.id}
                                                >
                                                    <Input
                                                        type="text"
                                                        name="product"
                                                        placeholder="New product..."
                                                        value={newProduct.name}
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
                                                                cat_index,
                                                                brand_index
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
                                                            brand.id
                                                        )
                                                    }
                                                >
                                                    X
                                                </Button>
                                                <ListGroup>
                                                    {brand.products.map(
                                                        product => (
                                                            <ListGroupItem
                                                                className="justify-content-between"
                                                                color="warning"
                                                                key={product.id}
                                                            >
                                                                {product.name}{' '}
                                                                <Button
                                                                    color="danger"
                                                                    style={{
                                                                        margin:
                                                                            20 +
                                                                            'px',
                                                                    }}
                                                                    onClick={() =>
                                                                        removeProductById(
                                                                            product.id
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
                                        )
                                    )}
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
