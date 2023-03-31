import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../../axiosApi";
import {Cocktail} from "../../../types";

export const fetchFullCocktail = createAsyncThunk<Cocktail, string>(
    'cocktails/fetchOne',
    async (id) => {
        const response = await axiosApi.get<Cocktail>('/cocktails/' + id);
        return response.data;
    }
);