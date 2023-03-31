import React, {useEffect} from 'react';
import {Card, CardActions, CardMedia, Grid, ListItem, styled, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectUser} from "../../users/usersSlice";
import {selectFullCocktail, selectFullCocktailFetching} from "./fullCocktailSlice";
import {fetchFullCocktail} from "./fullCocktailThunks";
import Preloader from "../../../components/UI/Preloader/Preloader";
import {apiURL} from "../../../constants";
import UnpublishedIcon from "@mui/icons-material/Unpublished";

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
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
        <Grid container p={3} justifyContent="center">
            <Preloader loading={loading} />
            {cocktail ? (
                <Grid container justifyContent={"space-between"} xs={8}>
                    <Card>
                        <Grid item padding={2}>
                            <Typography variant="h3" textAlign="center">{cocktail.title}</Typography>
                        </Grid>
                        <ImageCardMedia image={apiURL + '/' + cocktail.image} title={cocktail.title}/>
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
                <Grid item >
                    <Typography variant="h4">Cocktail is not found.</Typography>
                </Grid>
            )}
        </Grid>
    );
}
export default FullCocktail;














