import { createStore, applyMiddleware } from 'redux';
import {rootReducers} from '../reducers/combineReducers';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const Store = createStore(rootReducers,composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default Store;