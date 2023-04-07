// import { compose, createStore, applyMiddleware } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//     key: 'root',
//     storage: storage,
//     blacklist : ['user']
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(Boolean);

// const composedEnhancher = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// const composedEnhanchers = composedEnhancher(applyMiddleware(...middleWares));

// export const store = createStore(persistedReducer,undefined,composedEnhanchers);

export const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(middleWares),
});

// export const persistor = persistStore(store);

