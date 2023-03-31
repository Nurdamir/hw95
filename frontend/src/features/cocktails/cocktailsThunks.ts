import {createAsyncThunk} from "@reduxjs/toolkit";
import {Cocktail, CocktailMutation, ValidationError} from "../../types";
import axiosApi from "../../axiosApi";
import {isAxiosError} from "axios";

export const fetchCocktails = createAsyncThunk<Cocktail[], string | undefined>(
    'cocktails/fetchAll',
    async (id) => {
        let url = '/cocktails';

        if (id !== undefined) {
            url = `/cocktails?user=${id}`;
        }
        const response = await axiosApi.get(url);
        return response.data;
    }
);

export const createCocktail = createAsyncThunk<void, CocktailMutation, {rejectValue: ValidationError}>(
    'cocktails/create',
    async (cocktailMutation, {rejectWithValue}) => {
        try {
        const formData = new FormData();

        const keys = Object.keys(cocktailMutation) as (keyof CocktailMutation)[];

        keys.forEach(key => {
            const value = cocktailMutation[key];

            if (Array.isArray(value)) {
                formData.append(key, JSON.stringify(value));
            } else if (value) {
                formData.append(key, value);
            }
        });
        await axiosApi.post('/cocktails', formData);
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw e;
        }
    }
);

export const removeCocktail = createAsyncThunk<void, string>(
    'cocktails/delete',
    async (cocktailId) => {
        await axiosApi.delete('/cocktails/' + cocktailId);
    }
);

export const changePublishCocktail = createAsyncThunk<void, string>(
    'cocktails/patch',
    async (id) => {
        await axiosApi.patch('/cocktails/' + id + '/togglePublished');
    }
);