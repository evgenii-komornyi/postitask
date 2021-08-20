import React, { useState } from 'react';
import { connect } from 'react-redux';
import { removeEntity } from '../../redux/entity/entity.reducer';
import { setIsModalOpen } from '../../redux/modal/modal.reducer';

import {
    ListItemText,
    ListItemIcon,
    Collapse,
    ListItemSecondaryAction,
    IconButton,
    Tooltip,
} from '@material-ui/core';
import {
    Folder,
    FolderOpen,
    ExpandLess,
    ExpandMore,
    PlaylistAdd,
    DeleteForever,
} from '@material-ui/icons';

import { CustomListItem } from '../custom-list-item/custom-list-item.component';

import Product from '../product/product.component';

const Brand = ({
    brands,
    removeEntity,
    brandId,
    categoryId,
    classes,
    setIsModalOpen,
}) => {
    const [isOpen, setIsOpen] = useState('');

    const toggleBrand = brand_id => {
        isOpen === brand_id ? setIsOpen('') : setIsOpen(brand_id);
    };

    return (
        <>
            <CustomListItem
                key={brandId}
                className={classes.level1}
                button
                onClick={() => toggleBrand(brandId)}
            >
                {isOpen ? <ExpandLess /> : <ExpandMore />}
                <ListItemIcon>
                    {!isOpen ? <Folder /> : <FolderOpen />}
                </ListItemIcon>
                <ListItemText primary={brands[brandId].name} />
                <ListItemSecondaryAction>
                    <Tooltip title="Add product" placement="top">
                        <IconButton
                            edge="end"
                            aria-label="add"
                            onClick={() =>
                                setIsModalOpen({
                                    type: 'product',
                                    currentId: brandId,
                                })
                            }
                        >
                            <PlaylistAdd />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete brand" placement="right">
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() =>
                                removeEntity({
                                    type: 'brand',
                                    productId: '',
                                    brandId,
                                    categoryId,
                                })
                            }
                        >
                            <DeleteForever />
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
            </CustomListItem>

            {brands[brandId] &&
                brands[brandId].products.map(product_id => (
                    <Collapse
                        key={product_id}
                        in={isOpen === brandId}
                        timeout="auto"
                        unmountOnExit
                    >
                        <Product
                            productId={product_id}
                            brandId={brandId}
                            classes={classes}
                        />
                    </Collapse>
                ))}
        </>
    );
};

const mapStateToProps = ({
    entities: {
        entities: { brands },
    },
}) => ({ brands: brands });

const mapDispatchToProps = dispatch => {
    return {
        removeEntity: obj => dispatch(removeEntity(obj)),
        setIsModalOpen: obj => dispatch(setIsModalOpen(obj)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Brand);
