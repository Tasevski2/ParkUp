import styled from 'styled-components';
import {
  Typography,
  Divider,
  TextField,
  InputAdornment,
  Select,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export const Wrapper = styled.div`
  width: 500px;
  height: 100%;
  padding: 10px 20px;
  border: 1px solid ${(props) => props.theme.palette.background.shadow};
  box-shadow: 15px 15px 10px ${(props) => props.theme.palette.background.shadow};
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

export const Characteristics = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

export const KeyValueWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

export const Key = styled.p`
  font-size: 1.4rem;
  margin: 0;
`;

export const Value = styled(TextField).attrs({})`
  margin: 0;
  width: 50%;

  input {
    padding: 0 10px;
    font-size: 1.5rem;
    font-weight: 500;
    height: 43px;
  }
`;

export const TimeSelectInputsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  align-items: center;
  justify-content: space-evenly;
`;

export const TimeSelectInput = styled(Select).attrs({})`
  position: relative;
  > div {
    width: 35px;
    font-size: 1.5rem;
    padding: 8.5px 30px 0 15px;
  }
`;

export const TImeSelectInputsDivider = styled.p`
  height: 2px;
  width: 30px;
  border-bottom: 2px solid black;
`;

export const ColorCircleWrapper = styled.div`
  width: 50%;

  > div > button {
    border-radius: 50%;
    margin: 4px;
    width: 35px;
    min-width: 35px;
    height: 35px;
    > span {
      > div {
        border-radius: 50%;
        width: 35px;
        min-width: 35px;
        height: 35px;
      }
    }
  }
`;

export const ZoneCenterLocation = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

export const SmallTitle = styled(Typography).attrs({
  variant: 'h6',
  textAlign: 'center',
  marginBottom: '5px',
  fontWeight: 500,
  fontSize: '1.4rem',
})``;

export const LatLngCenter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 60px;
`;

export const LabelAndLatLngWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LatLngLabel = styled.label`
  font-size: 1.1rem;
`;

export const LatLngValue = styled(TextField)`
  margin: 0;
  margin-top: 5px;
  width: 95%;

  input {
    font-weight: 500;
    font-size: 1.5rem;
    text-align: center;
    padding: 0 10px;
    height: 43px;
  }
`;

export const ZoneCornersLocation = styled.div`
  width: 100%;
  margin-top: 25px;
`;

export const TableWrapper = styled.div`
  width: 80%;
  margin: auto;
  text-align: center;
  table {
    border-spacing: 0;
  }

  table tbody {
    display: block;
    max-height: 150px;
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
  th,
  td {
    padding: 10px 5px;
    font-size: 1.2rem;
  }
  th:first-of-type,
  th:last-of-type {
    width: 56px;
  }
  tbody tr td:first-of-type {
    width: 56px;
    padding-right: 10px;
    padding: 0;
    padding-left: 0;
    border: 0;
  }
  tbody tr td:last-of-type {
    width: 56px;
    padding: 0;
    border: 0;
  }
  thead th:nth-of-type(2) {
    border: 1px solid black;
    border-right: 2px solid black;
    border-bottom: 2px solid black;
  }
  thead th:nth-of-type(3) {
    border: 1px solid black;
    border-left: 0;
    border-bottom: 2px solid black;
  }
  tbody tr td:nth-of-type(2) {
    border-right: 2px solid black;
    border-left: 1px solid black;
  }
  tbody tr td:nth-of-type(3) {
    border-right: 1px solid black;
  }
  tbody tr td {
    border-bottom: 1px solid black;
  }

  tbody tr:last-of-type td {
    border-bottom: 0;
  }

  td {
    padding: 0;
  }
`;

export const EditedInputAdornment = styled(InputAdornment)`
  p {
    font-size: 1.2rem;
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
