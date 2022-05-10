import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';

//reducers
import { roomReducer } from "./reducers/rooms";


const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    rooms : roomReducer
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware : [thunk]
})