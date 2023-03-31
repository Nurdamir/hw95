import {Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks";
import {CocktailMutation} from "../../types";
import CocktailForm from "./components/CocktailForm";
import {createCocktail} from "./cocktailsThunks";

const AddCocktail = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onFormSubmit = async (cocktailMutation: CocktailMutation) => {
        try {
            await dispatch(createCocktail(cocktailMutation)).unwrap();
            navigate('/');
        } catch (e) {
            throw new Error();
        }
    };

    return (
        <>
            <Typography variant="h4" sx={{mb: 2}}>New cocktail</Typography>
            <CocktailForm onSubmit={onFormSubmit}/>
        </>
    );
};

export default AddCocktail;