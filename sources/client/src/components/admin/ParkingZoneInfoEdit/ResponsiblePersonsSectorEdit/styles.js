import styled from 'styled-components';
import { Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Box from '@mui/material/Box';
import CIcon from '@mui/icons-material/Close';

export const Wrapper = styled.div`
  width: 100%;
  height: 290px;
  border: 1px solid ${(props) => props.theme.palette.background.shadow};
  box-shadow: 15px 8px 10px ${(props) => props.theme.palette.background.shadow};
`;

export const TitleAndDividerWrapper = styled.div`
  width: 100%;
  padding: 10px 20px 0 20px;
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

export const TableWrapper = styled.div`
  width: 100%;
  margin: auto;
  text-align: center;
  margin-top: 15px;
  padding-left: 10px;
  padding-right: 66px;
  position: relative;
  table {
    border-spacing: 0;
    border-bottom: 0;
    word-break: break-all;
    font-size: 1.2rem;
  }

  table tbody {
    display: block;
    max-height: 160px;
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
  th:last-of-type {
    width: 90px;
    border-right: 1px solid black;
  }
  th:not(:first-of-type) {
    border-top: 1px solid black;
  }
  th,
  td {
    padding: 10px 5px;
  }
  th:nth-of-type(2),
  td:nth-of-type(2) {
    border-left: 1px solid black;
  }
  th {
    border-bottom: 2px solid black;
    border-left: 2px solid black;
    :first-of-type {
      width: 56px;
      border: 0;
    }
  }
  td {
    border-left: 2px solid black;
    border-bottom: 1px solid black;
  }
  tr td:first-of-type {
    width: 56px;
    border: 0;
    padding: 0;
  }
  tr td:last-of-type {
    width: 90px;
    padding-bottom: 0;
    border-right: 1px solid black;
  }
  tr:last-of-type td {
    border-bottom: 0;
  }
`;

export const Elipsis = styled(Link)`
  text-decoration: none;
  font-size: 35px;
  line-height: 0px;
  font-weight: 900;
  letter-spacing: 2px;
  color: ${(props) => props.theme.palette.third.main};

  :hover {
    cursor: pointer;
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

export const ModalContainer = styled(Box).attrs({
  width: 720,
  height: 350,
  bgcolor: 'background.paper',
  boxShadow: 24,
  zIndex: 1000,
  marginBottom: '10%',
  position: 'relative',
  borderRadius: '15px',
})`
  padding: 0 25px 16px 25px;
`;

export const ModalCardsContainer = styled.div`
  height: 285px;
  overflow: auto;
  overflow-x: hidden;
  > div:not(:first-of-type) {
    margin-top: 15px;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  ::-webkit-scrollbar {
    // display: none;
    // background-color: red;
  }
`;
export const ModalNoMoreEmplyees = styled(Typography).attrs({
  variant: 'h3',
})`
  width: 100%;
  text-align: center;
  color: grey;
  margin-top: 91px;
`;
export const CloseIcon = styled(CIcon).attrs({
  sx: {
    color: 'red',
    fontSize: '2.5rem',
  },
})``;

export const ModalCard = styled.div`
  width: 600px;
  height: 60px;
  border-radius: 50px;
  padding: 5px 10px;
  background-color: #03c04a;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  color: white;
  letter-spacing: 0.1px;
`;

export const ModalCardKeyAndValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

export const ModalKeyAndValueDivider = styled(Divider).attrs({
  orientation: 'vertical',
  sx: {
    borderRightWidth: '2px',
  },
})``;

export const ModalCardKey = styled.p`
  font-size: 0.9rem;
  margin: 0;
`;

export const ModalCardValue = styled.p`
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  width: 100%;
  text-align: center;
`;

export const AddIconCard = styled(AddCircleIcon).attrs((props) => ({
  sx: {
    fontSize: '2.5rem',
    color: props.theme.palette.primary.main,
  },
}))``;
