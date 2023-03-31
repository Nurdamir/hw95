import {Cocktail, ValidationError} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {changePublishCocktail, createCocktail, fetchCocktails, removeCocktail} from "./cocktailsThunks";

interface CocktailsState {
    cocktails: Cocktail[];
    fetchLoading: boolean;
    createError: ValidationError | null;
    createLoading: boolean;
    deleteLoading: boolean | string;
    publishing: boolean | string;
}

const initialState: CocktailsState = {
    cocktails: [],
    fetchLoading: false,
    createError: null,
    createLoading: false,
    deleteLoading: false,
    publishing: false
};

export const cocktailsSlice = createSlice({
    name: 'cocktails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCocktails.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchCocktails.fulfilled, (state, {payload: allCocktails}) => {
            state.fetchLoading = false;
            state.cocktails = allCocktails;
        });
        builder.addCase(fetchCocktails.rejected, (state) => {
            state.fetchLoading = false;
        });

        builder.addCase(createCocktail.pending, (state) => {
            state.createLoading = true;
            state.createError = null;
        });
        builder.addCase(createCocktail.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createCocktail.rejected, (state, {payload: error}) => {
            state.createLoading = false;
            state.createError = error || null;
        });

        builder.addCase(removeCocktail.pending, (state, {meta: {arg: id}}) => {
            state.deleteLoading = id;
        });
        builder.addCase(removeCocktail.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(removeCocktail.rejected, (state) => {
            state.deleteLoading = false;
        });

        builder.addCase(changePublishCocktail.pending, (state, {meta: {arg: id}}) => {
            state.publishing = id;
        });
        builder.addCase(changePublishCocktail.fulfilled, (state) => {
            state.publishing = false;
        });
        builder.addCase(changePublishCocktail.rejected, (state) => {
            state.publishing = false;
        });
    }
});

export const cocktailsReducer = cocktailsSlice.reducer;

export const selectCocktails = (state: RootState) => state.cocktails.cocktails;
export const selectCreateError = (state: RootState) => state.cocktails.createError;
export const selectCocktailsFetching = (state: RootState) => state.cocktails.fetchLoading;
export const selectCocktailCreating = (state: RootState) => state.cocktails.createLoading;
export const selectCocktailDeleting = (state: RootState) => state.cocktails.deleteLoading;
export const selectCocktailPublishing = (state: RootState) => state.cocktails.publishing;



