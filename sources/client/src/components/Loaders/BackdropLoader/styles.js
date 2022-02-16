import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

export const Loader = styled(CircularProgress).attrs({
  sx: {
    zIndex: 1001,
  },
})`
  .MuiCircularProgress-svg {
    color: ${(props) => props.theme.palette.primary.light};
  }
`;
