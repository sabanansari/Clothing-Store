import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./root-saga";

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist : ['cart'],
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV === 'development' && logger, sagaMiddleware].filter(Boolean);

const composedEnhancher = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhanchers = composedEnhancher(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer,undefined,composedEnhanchers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

