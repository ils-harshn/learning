import { configureStore } from "@reduxjs/toolkit";

import  createSagaMiddleware  from 'redux-saga';
import combinedReducers from "./reducers";
import rootSaga from "./sagas";


const sagaMiddleware = createSagaMiddleware();

export default configureStore({
    reducer: combinedReducers,
    middleware: () => [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)