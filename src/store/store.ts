import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '@/store/authSlice';
import {documentApi} from "@/Features/Home/API/documentApi.ts";
import {signUpAuthApi} from "@/Features/SignUp/API/authApi.ts";
import {signInAuthApi} from "@/Features/SignIn/API/authApi.ts";
import {documentGetApi} from "@/Features/Home/API/documentGetAPI.ts";

const persistConfig = {
    key: 'root',
    storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer: {
        [signInAuthApi.reducerPath]: signInAuthApi.reducer,
        [signUpAuthApi.reducerPath]: signUpAuthApi.reducer,
        [documentApi.reducerPath]: documentApi.reducer,
        [documentGetApi.reducerPath]: documentGetApi.reducer,
        auth: persistedAuthReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }).concat(signInAuthApi.middleware, signUpAuthApi.middleware, documentApi.middleware, documentGetApi.middleware), // Add the documentApi middleware
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export {store, persistor};
