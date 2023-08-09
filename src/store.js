import { configureStore } from "@reduxjs/toolkit"
import { searchSlice } from './features/Search/state/SearchSlice'
import { navigationSlice } from './layouts/NavigationSlice'

export const store = configureStore({
    reducer: {
        searchStoreReducer: searchSlice.reducer,
        navigationStoreReducer: navigationSlice.reducer,
    },
});