import React, {useEffect} from 'react';
import {Card, CardActions, Grid, ListItem, styled, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectUser} from "../../users/usersSlice";
import {selectFullCocktail, selectFullCocktailFetching} from "./fullCocktailSlice";
import {fetchFullCocktail} from "./fullCocktailThunks";
import Preloader from "../../../components/UI/Preloader/Preloader";
import {apiURL} from "../../../constants";
import UnpublishedIcon from "@mui/icons-material/Unpublished";

const StyledImage = styled('img')({
    height: '500px',
    width: '450px',
    borderRadius: '12px',
});

const FullCocktail = () => {
    const {id} = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const loading = useAppSelector(selectFullCocktailFetching);
    const cocktail = useAppSelector(selectFullCocktail);

    useEffect(() => {
        dispatch(fetchFullCocktail(id));
    }, [dispatch, id]);

    return (
        <Grid container padding={3} justifyContent="center">
            <Preloader loading={loading} />
            {cocktail ? (
                <Grid container justifyContent={"space-between"}>
                    <Card>
                        <Grid item padding={2}>
                            <Typography variant="h3" textAlign="center">{cocktail.title}</Typography>
                        </Grid>
                        <Grid item padding={2} textAlign="center">
                            <StyledImage src={apiURL + '/' + cocktail.image} title={cocktail.title}/>
                        </Grid>
                        <CardActions>
                            <Grid container justifyContent="space-between" alignItems="center">
                                {user && user.role === 'admin' && !cocktail.isPublished && (
                                    <UnpublishedIcon/>
                                )}
                            </Grid>
                        </CardActions>
                        <Grid item padding={2}>
                            <Typography variant="h4">Recipe:</Typography>
                            <Typography variant="h5">{cocktail.recipe}</Typography>
                        </Grid>
                        <Grid item padding={2}>
                            <Typography variant="h4">Ingredients: </Typography>
                            {cocktail.ingredients.map(item => (
                            <ListItem key={Math.random()}>
                                <Typography variant="h5">{item.title} - {item.amount}</Typography>
                            </ListItem> ))}
                        </Grid>
                        <Grid item padding={2}>
                            <Typography variant="h4" textAlign="center">Drink with pleasure!</Typography>
                        </Grid>
                    </Card>
                </Grid>
            ) : (
                <Grid item>
                    <Typography variant="h4">Cocktail is not found.</Typography>
                </Grid>
            )}
        </Grid>
    );
}
export default FullCocktail;














