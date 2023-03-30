import {Types} from "mongoose";

export interface IUser {
    email: string;
    password: string;
    token: string;
    role: string;
    displayName: string;
    avatar: string;
    googleId?: string;
}

export interface CocktailWithId {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    title: string;
    image: string;
    recipe: string;
    isPublished: boolean;
    ingredients: [{
        title: string;
        amount: string;
    }]
}