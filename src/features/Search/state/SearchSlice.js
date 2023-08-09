import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { debounce } from 'lodash'

//this sets the initial state of the search slice
const initialState = {
    value: {
        searchQuery: "",
        searchAttempts: 0,
        loading: false,
        clients: [],
    }
}

//this will export the search slice values & functions
export const searchSlice = createSlice({
    name: "searchSlice",
    initialState: initialState,
    reducers: {
        searchInputChanged: (state, action) => {
            //this will update the state value by duplicating the current state values, then overriding the values with the action payload
            //state.value = { ...state.value, ...action.payload }
            state.value.searchQuery = action.payload;
            state.value.loading = true;
        },
        incrementAttempts: (state) => {
            //this will incriment the state value by 1
            state.value.searchAttempts += 1
        },
        updateClients: (state, action) => {
            state.value.clients = action.payload
        },
        finishLoading: (state, action) => {
            state.value.loading = false
        },

    }
})

//this will export the searchInputChanged function
export const searchInputChanged = searchSlice.actions.searchInputChanged


// Both notations are equivalent
// The first one is called variable destructuring
// const { incrementAttempts } = searchSlice.actions;
const incrementAttempts = searchSlice.actions.incrementAttempts;
export const finishLoading = searchSlice.actions.finishLoading;
const updateClients = searchSlice.actions.updateClients;

const searchFunction = async (userInput, { dispatch }) => {
    try {
        if (userInput) {
            const response = await fetch(`/api/findUsersByString/${userInput}`, {
                method: "GET"
            });
            const data = await response.json();
            dispatch(updateClients(data.users));
        }else{
            var emptyUsers = []
            dispatch(updateClients(emptyUsers));
        }
        
        dispatch(incrementAttempts());
        dispatch(finishLoading())
    } catch (error) {
        console.log(error);
        dispatch(finishLoading())
    }


}

const debouncedFetchSearch = debounce(searchFunction, 500);


export const debounceInput = createAsyncThunk(
    "debounceInputKey",
    debouncedFetchSearch
);