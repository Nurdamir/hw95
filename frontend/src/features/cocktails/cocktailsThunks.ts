import {createAsyncThunk} from "@reduxjs/toolkit";
import {Cocktail, CocktailMutation} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchCocktails = createAsyncThunk<Cocktail[], string | undefined>(
    'cocktails/fetchAll',
    async (id) => {
        let url = '/cocktails';

        if (id !== undefined) {
            url = `/cocktails?user=${id}`;
        }

        const response = await axiosApi.get(url);
        console.log(response.data);

        return response.data;


    }
);

export const createCocktail = createAsyncThunk<void, CocktailMutation>(
    'cocktails/create',
    async (cocktailMutation) => {
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