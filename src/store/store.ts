import { compose, createStore, applyMiddleware, Middleware } from "redux";
import {logger} from '../index';
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer,PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./root-saga";

export type RootState = ReturnType<typeof rootReducer>;

declare global{
    interface Window{
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
}

const persistConfig:ExtendedPersistConfig = {
    key: 'root',
    storage: storage,
    whitelist : ['cart'],
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV === 'production' && logger, sagaMiddleware].filter((middleware):middleware is Middleware=> Boolean(middleware));

const composedEnhancher = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhanchers = composedEnhancher(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer,undefined,composedEnhanchers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

