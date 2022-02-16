import styled from 'styled-components';
import T from '@mui/material/Table';
import TH from '@mui/material/TableHead';
import TContainer from '@mui/material/TableContainer';
import TR from '@mui/material/TableRow';
import TB from '@mui/material/TableBody';
import TC from '@mui/material/TableCell';

import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

export const TableContainer = styled(TContainer).attrs({
  component: Paper,
})`
  max-width: 1100px;
  margin-top: 20px;
  margin-left: 30px;
  box-shadow: 15px 15px 10px ${(props) => props.theme.palette.background.shadow};
`;

export const TableHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  border: 1px solid grey;
  border-bottom: none;
  padding: 10px 16px;
  position: relative;
  background-color: ${(props) => props.theme.palette.grey[400]};
`;

export const TableTitle = styled(Typography).attrs({
  variant: 'h4',
})`
  font-size: 2rem;
  font-weight: 600;
`;

export const CreateEmployeeButton = styled(Button).attrs((props) => ({
  variant: 'contained',
  size: 'large',
  sx: {
    backgroundColor: `${props.theme.palette.primary.main}`,
  },
}))`
  padding-left: 11px;

  :hover {
    background-color: ${(props) => props.theme.palette.primary.dark};
  }
`;

export const AddIcon = styled(AddCircleOutlineIcon)`
  margin-right: 11px;
`;

export const Table = styled(T).attrs({})`
  th,
  td {
    padding: 20px;
    font-size: 1rem;
  }
`;

export const IdentityIcon = styled(PermIdentityIcon).attrs((props) => ({
  sx: {
    color: `${props.theme.palette.primary.dark}`,
  },
}))``;

export const TableHead = styled(TH).attrs({})`
  tr {
    background-color: ${(props) => `${props.theme.palette.grey[900]}`};
    th {
      color: white;
    }
  }
`;

export const TableRow = styled(TR).attrs({})``;

export const TableBody = styled(TB).attrs({})`
  tr:last-child td,
  tr:last-child th {
    border: none;
  }

  tr:nth-of-type(odd) {
    background-color: ${(props) => `${props.theme.palette.grey[400]}`};
    :hover {
      cursor: pointer;
      background-color: ${(props) => `${props.theme.palette.grey[500]}`};
    }
  }

  tr:nth-of-type(even) {
    background-color: ${(props) => `${props.theme.palette.grey[200]}`};
    :hover {
      cursor: pointer;
      background-color: ${(props) => `${props.theme.palette.grey[300]}`};
    }
  }
`;

export const TableCell = styled(TC).attrs({})``;

export const ButtonTableCell = styled(TC).attrs({
  sx: {
    padding: 0,
  },
})`
  z-index: 100;
`;

export const ToggleAccoutStatusButton = styled(Button).attrs((props) => ({
  variant: 'contained',
  size: 'medium',
  sx: {
    backgroundColor: props.$enabled
      ? `${props.theme.palette.primary.main}`
      : `${props.theme.palette.error.main}`,
  },
}))`
  :hover {
    background-color: ${(props) =>
      props.$enabled
        ? `${props.theme.palette.primary.light}`
        : `${props.theme.palette.error.light}`};
  }
`;

export const SearchField = styled(TextField).attrs({
  variant: 'standard',
})`
  > div:before {
    border-bottom: 1px solid ${(props) => props.theme.palette.primary.dark};
  }
  input {
    color: ${(props) => props.theme.palette.primary.dark};
    font-weight: 600;
  }
`;
