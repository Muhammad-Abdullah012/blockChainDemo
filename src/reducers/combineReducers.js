import {blocksReducer} from './reducers';
import { combineReducers } from 'redux'


export const rootReducers = combineReducers({
    blocksReducer: blocksReducer
});