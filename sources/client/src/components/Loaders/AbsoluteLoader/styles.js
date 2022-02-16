import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

export const Container = styled.div``;

export const Loader = styled(CircularProgress).attrs({
    size: '100%',
})`
    .MuiCircularProgress-svg {
        color: ${(props) => props.theme.palette.primary.light};
    }
`;
