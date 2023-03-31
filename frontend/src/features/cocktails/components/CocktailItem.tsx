import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, Grid, IconButton, styled, Typography} from '@mui/material';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import {apiURL} from '../../../constants';
import {useAppSelector} from "../../../app/hooks";
import {selectUser} from "../../users/usersSlice";
import ButtonWithProgress from "../../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {selectCocktailDeleting, selectCocktailPublishing} from "../cocktailsSlice";
import {Link} from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
});

const ActionsContainer = styled(CardActions)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
});

interface Props {
    id: string;
    user?: string;
    title: string;
    image: string | null;
    isPublished: boolean;
    onRemove: (id: string) => void;
    onPublish: (id: string) => void;
}

const CocktailItem: React.FC<Props> = ({id, title, image, isPublished, onRemove, onPublish}) => {
    const user = useAppSelector(selectUser);
    const loading = useAppSelector(selectCocktailDeleting);
    const loadingPublish = useAppSelector(selectCocktailPublishing);

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardHeader title={title}/>
                <ImageCardMedia image={apiURL + '/' + image} title={title}/>
                <CardActions>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <IconButton component={Link} to={'/cocktails/' + id}
                                    disabled={loading ? loading === id : loadingPublish ? loadingPublish === id : false}>
                            <ArrowForwardIcon/>
                        </IconButton>

                        {user && user.role === 'admin' && !isPublished && (
                            <UnpublishedIcon/>
                        )}

                        {user && user.role === 'user' && !isPublished && (
                            <UnpublishedIcon/>
                        )}
                    </Grid>
                </CardActions>

                {user && user.role === 'admin' && (
                    <ActionsContainer>
                        <Grid item>
                            <ButtonWithProgress
                                variant="contained"
                                onClick={() => onRemove(id)}
                                disabled={loading ? loading === id : loadingPublish ? loadingPublish === id : false}
                                loading={loading ? loading === id : false}>
                                Delete
                            </ButtonWithProgress>
                        </Grid>

                        {!isPublished && (
                            <Grid item>
                                <ButtonWithProgress
                                    variant="contained"
                                    onClick={() => onPublish(id)}
                                    disabled={loading ? loading === id : loadingPublish ? loadingPublish === id : false}
                                    loading={loadingPublish ? loadingPublish === id : false}>
                                    Publish
                                </ButtonWithProgress>
                            </Grid>
                        )}
                    </ActionsContainer>
                )}
                {user && user.role === 'user' && !isPublished && (
                    <Grid item>
                        <Typography variant="h6" textAlign="center">Ваш коктейль находится на рассмотрении
                            модератора</Typography>
                    </Grid>
                )}
            </Card>
        </Grid>
    );
};

export default CocktailItem;