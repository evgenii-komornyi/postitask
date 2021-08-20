import React, { useState } from 'react';
import { connect } from 'react-redux';
import { removeEntity } from '../../redux/entity/entity.reducer';
import { setIsModalOpen } from '../../redux/modal/modal.reducer';

import {
    ListItemText,
    ListItemIcon,
    ListItemSecondaryAction,
    IconButton,
    Collapse,
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

import Brand from '../brand/brand.component';

const Category = ({
    categories,
    removeEntity,
    categoryId,
    classes,
    setIsModalOpen,
}) => {
    const [isOpen, setIsOpen] = useState('');

    const toggleCategory = category_id => {
        isOpen === category_id ? setIsOpen('') : setIsOpen(category_id);
    };

    return (
        <>
            <CustomListItem button onClick={() => toggleCategory(categoryId)}>
                {isOpen ? <ExpandLess /> : <ExpandMore />}
                <ListItemIcon>
                    {!isOpen ? <Folder /> : <FolderOpen />}
                </ListItemIcon>
                <ListItemText primary={categories[categoryId].name} />
                <ListItemSecondaryAction>
                    <Tooltip title="Add brand" placement="top">
                        <IconButton
                            aria-label="add"
                            onClick={() =>
                                setIsModalOpen({
                                    type: 'brand',
                                    currentId: categoryId,
                                })
                            }
                        >
                            <PlaylistAdd />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete category" placement="right">
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() =>
                                removeEntity({
                                    type: 'category',
                                    brandId: '',
                                    productId: '',
                                    categoryId,
                                })
                            }
                        >
                            <DeleteForever />
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
            </CustomListItem>

            {categories[categoryId] &&
                categories[categoryId].brands.map(brand_id => (
                    <Collapse
                        key={brand_id}
                        in={isOpen === categoryId}
                        timeout="auto"
                        unmountOnExit
                    >
                        <Brand
                            brandId={brand_id}
                            categoryId={categoryId}
                            classes={classes}
                        />
                    </Collapse>
                ))}
        </>
    );
};

const mapStateToProps = ({
    entities: {
        entities: { categories },
    },
    modal: { isOpen },
}) => ({
    categories: categories,
    isModalOpen: isOpen,
});

const mapDispatchToProps = dispatch => {
    return {
        removeEntity: obj => dispatch(removeEntity(obj)),
        setIsModalOpen: obj => dispatch(setIsModalOpen(obj)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
