import * as React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ButtonWithProgressProps extends React.ComponentProps<typeof Button> {
    loading: boolean;
}

const StyledButton = styled(Button)({
    position: 'relative',
});

const StyledCircularProgress = styled(CircularProgress)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-12px',
    marginLeft: '-12px',
});

const ButtonWithProgress: React.FC<ButtonWithProgressProps> = ({ children, loading, ...props }) => {
    return (
        <StyledButton {...props}>
            {children}
            {loading && <StyledCircularProgress size={25} color="inherit" />}
        </StyledButton>
    );
};

export default ButtonWithProgress;
