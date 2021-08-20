import React from 'react';
import { connect } from 'react-redux';
import { setIsModalOpen } from '../../redux/modal/modal.reducer';

import { makeStyles } from '@material-ui/core';

import { List, Tooltip, IconButton } from '@material-ui/core';
import { PlaylistAdd } from '@material-ui/icons';

import Category from '../category/category.component';
import AddItemModal from '../add-item-modal/add-item-modal.component';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 500,
        backgroundColor: theme.palette.background.paper,
    },
    level1: {
        paddingLeft: theme.spacing(4),
    },
    level2: {
        paddingLeft: theme.spacing(8),
    },
}));

const EntitiesList = ({
    entities: { result: categories_id },
    setIsModalOpen,
}) => {
    const classes = useStyles();

    return (
        <>
            <List component="nav" className={classes.root}>
                <Tooltip title="Add Category" placement="right">
                    <IconButton
                        aria-label="add"
                        style={{ left: 450 }}
                        onClick={() =>
                            setIsModalOpen({ type: 'category', currentId: '' })
                        }
                    >
                        <PlaylistAdd />
                    </IconButton>
                </Tooltip>
                {categories_id &&
                    categories_id.map(category_id => (
                        <Category
                            key={category_id}
                            categoryId={category_id}
                            classes={classes}
                        />
                    ))}
            </List>
            <AddItemModal />
        </>
    );
};

const mapStateToProps = ({ entities }) => ({
    entities: entities,
});

const mapDispatchToProps = dispatch => ({
    setIsModalOpen: obj => dispatch(setIsModalOpen(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EntitiesList);
