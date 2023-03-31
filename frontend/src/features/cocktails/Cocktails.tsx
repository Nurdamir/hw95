import {Button, Grid, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import React, {useEffect} from 'react';
import Preloader from "../../components/UI/Preloader/Preloader";
import {selectUser} from "../users/usersSlice";
import {Link} from "react-router-dom";
import {selectCocktails, selectCocktailsFetching} from "./cocktailsSlice";
import {changePublishCocktail, fetchCocktails, removeCocktail} from "./cocktailsThunks";
import CocktailItem from "./components/CocktailItem";

interface Props {
    myId?: string;
}

const Cocktails: React.FC<Props> = ({myId}) => {
    const dispatch = useAppDispatch();
    const cocktails = useAppSelector(selectCocktails);
    const loading = useAppSelector(selectCocktailsFetching);
    const user = useAppSelector(selectUser);

    useEffect(() => {
        if(myId) {
            dispatch(fetchCocktails(myId));
        } else {
            dispatch(fetchCocktails());
        }
    }, [dispatch, myId]);

    const onRemove = async (id: string) => {
        await dispatch(removeCocktail(id));
        await dispatch(fetchCocktails());
    };

    const onPublish = async (id: string) => {
        await dispatch(changePublishCocktail(id));
        await dispatch(fetchCocktails());
    };

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item container justifyContent="space-between" alignItems="center">
                {cocktails.length > 0 ? (
                    <Grid item>
                        <Typography variant="h4">
                            Cocktails
                        </Typography>
                    </Grid>
                ) : (<Grid item>
                    <Typography variant="h4">
                        No Cocktails!
                    </Typography>
                </Grid>)}
                <Grid item>
                    {user && (
                        <Button color="primary" component={Link} to="/cocktails/add">
                            Add cocktail
                        </Button>
                    )}
                </Grid>
            </Grid>

            <Grid item container direction="row" spacing={1}>
                {loading ? (
                    <Preloader loading={loading}/>
                ) : cocktails.map(cocktail => (
                    <CocktailItem
                        key={cocktail._id}
                        id={cocktail._id}
                        title={cocktail.title}
                        image={cocktail.image}
                        isPublished={cocktail.isPublished}
                        user={cocktail.user}
                        onRemove={() => onRemove(cocktail._id)}
                        onPublish={() => onPublish(cocktail._id)}
                    />
                ))}
            </Grid>
        </Grid>
    );
}

export default Cocktails;