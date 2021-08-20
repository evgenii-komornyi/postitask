import { entityReducer } from './entity/entity.reducer';
import { modalReducer } from './modal/modal.reducer';

export const rootReducer = {
    entities: entityReducer,
    modal: modalReducer,
};
