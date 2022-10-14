import { configureStore } from '@reduxjs/toolkit';
import loginDataReducer from './LoginCheck';
import rawDataReducer from './RawdataSlice';
import portDataReducer from './PortdataSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

const reducers = combineReducers({
	loginData: loginDataReducer,
	rawData: rawDataReducer,
	portData: portDataReducer,
});

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: [thunk],
});

export default store;
