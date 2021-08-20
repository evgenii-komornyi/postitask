import React from 'react';
import { connect } from 'react-redux';
import { removeEntity } from '../../redux/entity/entity.reducer';

import {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Tooltip,
} from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';

const Product = ({ products, removeEntity, productId, brandId, classes }) => {
    return (
        <ListItem key={productId} button className={classes.level2}>
            <ListItemText primary={products[productId].name} />
            <ListItemSecondaryAction>
                <Tooltip title="Delete product" placement="right">
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() =>
                            removeEntity({
                                type: 'product',
                                productId,
                                brandId,
                                categoryId: '',
                            })
                        }
                    >
                        <DeleteForever />
                    </IconButton>
                </Tooltip>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

const mapStateToProps = ({
    entities: {
        entities: { products },
    },
}) => ({
    products: products,
});

const mapDispatchToProps = dispatch => {
    return {
        removeEntity: obj => dispatch(removeEntity(obj)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);
