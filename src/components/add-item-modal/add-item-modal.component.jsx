import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setIsModalOpen } from '../../redux/modal/modal.reducer';
import { addEntity } from '../../redux/entity/entity.reducer';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
} from '@material-ui/core';
import {} from '@material-ui/icons';

const AddItemModal = ({
    isOpen,
    type,
    currentId,
    setIsModalOpen,
    addEntity,
}) => {
    const [value, setValue] = useState('');

    const addEntityHandler = () => {
        addEntity({ value, type, currentId: currentId });
        setValue('');
        setIsModalOpen({ type: '', currentId: '' });
    };

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={() => setIsModalOpen({ type: '', currentId: '' })}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add new {type}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={`New ${type}`}
                        type="text"
                        fullWidth
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() =>
                            setIsModalOpen({ type: '', currentId: '' })
                        }
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button color="primary" onClick={addEntityHandler}>
                        Add new {type}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const mapStateToProps = ({ modal: { isOpen, type, currentId } }) => ({
    isOpen: isOpen,
    type: type,
    currentId: currentId,
});
const mapDispatchToProps = dispatch => ({
    setIsModalOpen: type => dispatch(setIsModalOpen(type)),
    addEntity: obj => dispatch(addEntity(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddItemModal);
