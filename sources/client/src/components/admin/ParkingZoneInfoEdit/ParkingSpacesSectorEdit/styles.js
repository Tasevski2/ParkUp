import styled from 'styled-components';
import { Typography, Divider } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export const Wrapper = styled.div`
  width: 100%;
  height: 380px;
  border: 1px solid ${(props) => props.theme.palette.background.shadow};
  box-shadow: 15px 15px 10px ${(props) => props.theme.palette.background.shadow};
`;

export const TopPartWrapper = styled.div`
  width: 100%;
  padding: 10px 20px 0 20px;
  text-align: center;
`;

export const Title = styled(Typography).attrs({
  variant: 'h4',
  textAlign: 'center',
  marginBottom: '10px',
  fontSize: '1.7rem',
  fontWeight: 500,
})``;

export const DividerUnderTitle = styled(Divider).attrs({
  sx: {
    borderBottomWidth: '2px',
  },
})``;

export const ParkingSpacesNumberWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
`;

export const NumberLabel = styled.p`
  font-size: 1.4rem;
  margin: 0;
`;

export const NumberValue = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  margin: 0;
`;

export const TableWrapper = styled.div`
    width: 100%;
    margin: auto;
    text-align: center;
    margin-top: 15px;
    padding-left: 10px;
    padding-right: 10px;
    table {
        border-spacing: 0;
        border-bottom: 0;
        word-break: break-all;
        font-size: 1.2rem;
    }

    table tbody {
        display: block;
        max-height: 200px;
        overflow-y: auto;
    }
    tbody::-webkit-scrollbar {
        display: none;
    }
    table thead,
    table tbody tr {
        display: table;
        width: 100%;
        table-layout: fixed;
    }

    th {
        padding: 10px 5px;
    }

    th {
        border-bottom: 2px solid black;
        border-left: 2px solid black;
        :first-of-type {
            width: 56px;
            border: 0;
        }
        :nth-of-type(2),
        :nth-of-type(3),
        :nth-of-type(4) {
            border-top: 1px solid black;
        }
        :nth-of-type(2) {
            border-left: 1px solid black;
        }
        :nth-of-type(4) {
            width: 90px;
            border-right: 1px solid black;
        }
        :last-of-type {
            width: 56px;
            border: 0;
        }
    }
    td {
        border-left: 2px solid black;
        border-bottom: 1px solid black;
        text-overflow: ellipsis;
    }
    tr td:first-of-type {
        width: 56px;
        border: 0;
    }
    tr td:nth-of-type(2) {
        border-left: 1px solid black;
    }
    tr td:nth-of-type(4) {
        width: 90px;
        border-right: 1px solid black;
    }
    tr td:last-of-type {
        border: 0;
        width: 56px;
    }
    tr:last-of-type td {
        border-bottom: 0;
    }
`;

export const AddIcon = styled(AddCircleOutlineIcon).attrs((props) => ({
  sx: {
    fontSize: '2.5rem',
    color: props.theme.palette.primary.main,
  },
}))``;

export const DeleteIcon = styled(HighlightOffIcon).attrs((props) => ({
  sx: {
    fontSize: '2.5rem',
    color: props.theme.palette.error.main,
  },
}))``;

export const TableDataInput = styled.input`
  width: 100%;
  height: 47px;
  padding: 3.5px 5px;
  border: 0;
  font-size: 1.2rem;
  text-align: center;

  &:focus {
    background-color: rgba(0, 173, 124, 0.2);
    font-weight: 600;
  }
`;
