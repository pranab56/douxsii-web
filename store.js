import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./utils/apiBaseQuery";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
