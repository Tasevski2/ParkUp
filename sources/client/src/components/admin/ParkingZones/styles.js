import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Add from '@mui/icons-material/Add';
import { Typography, Divider } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ClearIcon from '@mui/icons-material/Clear';
import { ParkingZoneWrapper, Container } from './ParkingZoneCard/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CIcon from '@mui/icons-material/Close';
import { mobile_max_width } from '../../../config/utilities';

export const FiltersWrapper = styled.div`
    margin-bottom: 10px;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10%;

    @media (max-width: ${mobile_max_width}px) {
        flex-direction: column;
    }
`;

export const SortingArrowsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;

    @media (max-width: ${mobile_max_width}px) {
        margin-top: 30px;
    }
`;

export const ArrowDown = styled(ArrowDownwardIcon).attrs({})`
    font-size: 2rem;
    color: ${(props) =>
        props.selected ? props.theme.palette.primary.main : ''};
    :hover {
        cursor: pointer;
        color: ${(props) => props.theme.palette.primary.main};
    }
`;

export const ArrowUp = styled(ArrowUpwardIcon).attrs({})`
    margin: 0 10px 0 15px;
    font-size: 2rem;
    color: ${(props) =>
        props.selected ? props.theme.palette.primary.main : ''};
    :hover {
        cursor: pointer;
        color: ${(props) => props.theme.palette.primary.main};
    }
`;

export const ClearSortIcon = styled(ClearIcon).attrs({})`
    color: ${(props) => props.theme.palette.error.main};
    position: absolute;
    right: 0;
    font-size: 2rem;
    right: -50px;
    :hover {
        cursor: pointer;
    }
`;

export const DividerUnderFilters = styled(Divider).attrs({
    variant: 'middle',
    sx: {
        margin: '0 9%',
        borderWidth: '2px',
        borderBottomWidth: 'thin',
    },
})``;

export const SortByTitle = styled(Typography).attrs((props) => ({
    fontSize: '1rem',
    fontWeight: '600',
    margin: 0,
    color: `${props.theme.palette.primary.main}`,
}))``;

export const ParkingName = styled(Typography).attrs((props) => ({
    fontSize: '2rem',
    fontWeight: '600',
    margin: 0,
    color: `${props.theme.palette.primary.main}`,
}))``;

export const ParkingZonesWrapper = styled(Grid)`
    margin: 0;
    height: 100%;
    width: 100%;
    padding: 0 40px 30px 0;

    @media (max-width: ${mobile_max_width}px) {
        padding-right: 0;
        justify-content: center;
    }
`;

export const AddParkingZoneCard = styled(ParkingZoneWrapper)``;

export const AddItem = styled(Container)`
    display: flex;
    align-items: center;
    justify-content: middle;
`;

export const AddIcon = styled(Add).attrs({
    sx: {
        fontWeight: 500,
    },
})`
    width: 100%;
    height: 100%;
    color: ${(props) => props.theme.palette.primary.main};
`;

export const ModalContainer = styled(Box).attrs({
    width: 400,
    height: 366,
    bgcolor: 'background.paper',
    boxShadow: 24,
    zIndex: 1000,
    marginBottom: '10%',
})`
    padding-bottom: 16px;
`;

export const ModalTitle = styled(Typography).attrs({
    variant: 'h4',
    fontWeight: 600,
    textAlign: 'center',
})``;

export const ModalInputAndLabelWrapper = styled.div`
    text-align: center;
    padding: 0 20px;
    margin-top: 40px;
    margin-bottom: 70px;
`;

export const ModalInputLabel = styled(Typography).attrs({
    variant: 'h6',
})``;

export const ModalInput = styled(TextField).attrs({
    fullWidth: true,
    sx: {
        marginTop: '10px',
    },
})`
    fieldset {
        border: 0;
    }
    input {
        text-align: center;
        font-size: 1.1rem;
        font-weight: 500;
        padding: 15px 10px;
        border: 2px solid ${(props) => props.theme.palette.primary.main};

        :focus {
            border: 2px dashed ${(props) => props.theme.palette.primary.main};
        }
    }
`;

export const ButtonWrapper = styled.div`
    width: 100%;
    text-align: center;
`;

export const ModalButton = styled(Button).attrs((props) => ({
    variant: 'contained',
    size: 'large',
    sx: {
        backgroundColor: `${props.theme.palette.primary.main}`,
    },
}))`
    :hover {
        background-color: ${(props) => props.theme.palette.primary.dark};
    }
`;

export const CloseIcon = styled(CIcon).attrs({
    sx: {
        color: 'red',
        fontSize: '2.5rem',
    },
})``;
