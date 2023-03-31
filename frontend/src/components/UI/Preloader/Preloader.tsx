import React from 'react';
import {Backdrop, CircularProgress, styled} from '@mui/material';
import {SxProps} from '@mui/system';

const StyledBackdrop = styled(Backdrop)(({theme}: {theme: any}) => ({
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
}));

type PreloaderProps = {
    loading: boolean;
    sx?: SxProps;
};

const Preloader: React.FC<PreloaderProps> = ({loading, sx}) => {
    if (!loading) {
        return null;
    }

    return (
        <StyledBackdrop open={loading} sx={sx}>
            <CircularProgress color="inherit" />
        </StyledBackdrop>
    );
};

export default Preloader;
