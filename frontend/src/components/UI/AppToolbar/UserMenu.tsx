import React, {useState} from 'react';
import {Avatar, Button, Grid, Menu, MenuItem} from '@mui/material';
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks";
import {logout} from "../../../features/users/usersThunks";
import {apiURL} from "../../../constants";
import {User} from "../../../types";

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/');
    };

    return (
        <>
            <Button component={Link} to={"/myCocktails"} color="inherit">My cocktails</Button>
            <Button
                onClick={handleClick}
                color="inherit"
            >
                Hello, {user.displayName}
                {user.avatar && (
                    <Grid item paddingLeft={1}>
                        <Avatar alt={user.displayName} src={apiURL + '/' + user.avatar}/>
                    </Grid>
                )}
            </Button>

            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;