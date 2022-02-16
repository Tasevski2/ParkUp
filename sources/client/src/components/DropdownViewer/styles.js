import styled from 'styled-components';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';

export const Dropdown = styled(Select).attrs((props) => ({
  sx: {
    width: props.width ?? '70%',
    textAlign: 'center',
  },
}))`
  > div {
    padding: 11px 32px 11px 9px;
  }
`;

export const DropdownItem = styled(Typography).attrs({
  variant: 'h4',
})`
  font-size: 1rem;
  font-weight: 500;
  margin-top: 5px;
  padding: 5px;
`;
