import React, {useState} from 'react';
import {Button, Grid, IconButton, TextField} from '@mui/material';
import {CocktailMutation, OneIngredient} from "../../../types";
import FileInput from "../../../components/UI/FileInput/FileInput";
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonWithProgress from "../../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {useAppSelector} from "../../../app/hooks";
import {selectCocktailCreating, selectCreateError} from "../cocktailsSlice";

interface Props {
    onSubmit: (mutation: CocktailMutation) => void;
}

const CocktailForm: React.FC<Props> = ({onSubmit}) => {
    const createLoading = useAppSelector(selectCocktailCreating);
    const error = useAppSelector(selectCreateError);

    const [state, setState] = useState<CocktailMutation>({
        title: '',
        image: '',
        recipe: '',
        ingredients: [{
            title: '',
            amount: '',
        }]
    });

    const submitFormHandler = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(state);
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setState((prevState) => {
            return {...prevState, [name]: value};
        });
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: files && files[0] ? files[0] : null,
        }));
    };

    const changeIngredient = (i: number, name: string, value: string) => {
        setState((prevState) => {
            const newIngredients = [...prevState.ingredients];
            newIngredients[i] = {
                ...newIngredients[i],
                [name]: value,
            };
            return {
                ...prevState,
                ingredients: newIngredients,
            };
        });
    };

    const addIngredient = () => {
        setState((prevState) => {
            const newIngredients = [
                ...prevState.ingredients,
                {
                    title: '',
                    amount: '',
                },
            ];
            return {
                ...prevState,
                ingredients: newIngredients,
            };
        });
    };

    const deleteIngredient = (ing: OneIngredient) => {
        setState((prevState) => {
            const newIngredients = prevState.ingredients.filter(
                (item) => item !== ing
            );
            return {
                ...prevState,
                ingredients: newIngredients,
            };
        });
    };

    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <form autoComplete="off" onSubmit={submitFormHandler}>
            <Grid container direction="column" spacing={2}>
                <Grid item xs>
                    <TextField
                        multiline
                        id="title"
                        label="Title"
                        value={state.title}
                        onChange={inputChangeHandler}
                        name="title"
                        required
                        error={Boolean(getFieldError('title'))}
                        helperText={getFieldError('title')}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        multiline
                        rows={3}
                        id="recipe"
                        label="Recipe"
                        value={state.recipe}
                        onChange={inputChangeHandler}
                        name="recipe"
                        required
                        error={Boolean(getFieldError('recipe'))}
                        helperText={getFieldError('recipe')}
                    />
                </Grid>
                <Grid item xs>
                    {state.ingredients.map((ing, i) => (
                        <Grid container key={i} alignItems="center">
                            <Grid item xs={6} paddingY={1} paddingRight={2}>
                                <TextField
                                    label="Ingredient name"
                                    type="text"
                                    name="title"
                                    value={ing.title}
                                    onChange={(e) => changeIngredient(i, 'title', e.target.value)}
                                    fullWidth
                                    required
                                    error={Boolean(getFieldError(`ingredients.${i}.title`))}
                                    helperText={getFieldError(`ingredients.${i}.title`)}
                                />
                            </Grid>
                            <Grid item xs={5} paddingY={1} paddingRight={2}>
                                <TextField
                                    label="Amount"
                                    type="text"
                                    name="amount"
                                    value={ing.amount}
                                    onChange={(e) => changeIngredient(i, 'amount', e.target.value)}
                                    fullWidth
                                    required
                                    error={Boolean(getFieldError(`ingredients.${i}.amount`))}
                                    helperText={getFieldError(`ingredients.${i}.amount`)}
                                />
                            </Grid>
                            <Grid item paddingY={1}>
                                {state.ingredients.length > 1 && (
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => deleteIngredient(ing)}
                                    >
                                        <DeleteIcon fontSize="medium"/>
                                    </IconButton>
                                )}
                            </Grid>
                        </Grid>
                    ))}

                    <Grid item paddingTop={1}>
                        <Button
                            onClick={addIngredient}
                            variant="contained"
                            color="primary"
                        >
                            Add ingredient
                        </Button>
                    </Grid>
                </Grid>

                <Grid item>
                    <FileInput label="Image" onChange={fileInputChangeHandler} name="image" type="image/*"/>
                </Grid>

                <Grid item>
                    <ButtonWithProgress
                        type="submit"
                        variant="contained"
                        color="primary"
                        loading={createLoading}
                        disabled={createLoading}
                    >
                        Create
                    </ButtonWithProgress>
                </Grid>
            </Grid>
        </form>
    );
};

export default CocktailForm;
