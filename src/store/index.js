import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';

//reducers
import { roomReducer } from "./reducers/rooms";
import { authReducer } from './reducers/auth';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    rooms : roomReducer,
    auth : authReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware : [thunk]
})