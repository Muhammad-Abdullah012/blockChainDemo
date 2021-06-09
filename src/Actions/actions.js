import {CREATE_BLOCK} from '../Constants/constants';

export const getNewBlock = (obj) => {
    return {
        type: CREATE_BLOCK,
        payload: obj
    }
}