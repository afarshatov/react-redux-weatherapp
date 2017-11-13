import thunkMiddleware from 'redux-thunk';
import { createHashHistory } from 'history';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import weatherAppReducers from '../reducers/index';

export const history = createHashHistory();
export const store = createStore(
    combineReducers({...weatherAppReducers, router: routerReducer}),
    applyMiddleware(thunkMiddleware, routerMiddleware(history), createLogger())
);