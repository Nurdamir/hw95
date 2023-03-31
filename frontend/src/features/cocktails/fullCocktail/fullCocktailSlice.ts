import {createSlice} from '@reduxjs/toolkit';
import {Cocktail} from "../../../types";
import {fetchFullCocktail} from "./fullCocktailThunks";
import {RootState} from "../../../app/store";

interface FullCocktailState {
    oneCocktail: Cocktail | null;
    fetchLoading: boolean;
}

const initialState: FullCocktailState = {
    oneCocktail: null,
    fetchLoading: false,
};

export const oneCocktailSlice = createSlice({
    name: 'cocktail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFullCocktail.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchFullCocktail.fulfilled, (state, {payload: fullCocktail}) => {
            state.fetchLoading = false;
            state.oneCocktail = fullCocktail;
        });
        builder.addCase(fetchFullCocktail.rejected, (state) => {
            state.fetchLoading = false;
        });
    }
});

export const oneCocktailReducer = oneCocktailSlice.reducer;

export const selectFullCocktail = (state: RootState) => state.oneCocktail.oneCocktail;
export const selectFullCocktailFetching = (state: RootState) => state.oneCocktail.fetchLoading;

