import styled from 'styled-components';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import CIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

export const ZoneSectorAndDeleteButtonWrapper = styled.div`
    position: relative;
`;

export const DeleteButton = styled(Button).attrs({
    variant: 'outlined',
    startIcon: <DeleteIcon />,
})`
    position: absolute;
    font-size: 1rem;
    font-weight: 600;
    color: red;
    border: 3px solid red;
    padding: 5px 10px;
    top: -48px;
    :hover {
        border: 3px dashed red;
        background-color: rgba(255, 0, 0, 0.1);
    }
`;

export const RightSideWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    min-width: 500px;
    width: 500px;
    position: relative;
`;

export const SaveButton = styled(Button).attrs({
    variant: 'contained',
    startIcon: <SaveIcon />,
})`
    position: absolute;
    font-size: 1rem;
    font-weight: 600;
    background-color: ${(props) => props.theme.palette.primary.main};
    padding: 8px 15px;
    right: 150px;
    top: -49px;
    :hover {
        background-color: ${(props) => props.theme.palette.primary.dark};
    }
`;

export const CancelButton = styled(Button).attrs({
    variant: 'outlined',
    startIcon: <CancelIcon />,
})`
    position: absolute;
    font-size: 1rem;
    font-weight: 600;
    color: ${(props) => props.theme.palette.third.main};
    border: 3px solid ${(props) => props.theme.palette.third.main};
    padding: 5px 10px;
    right: 0;
    top: -48px;
    :hover {
        border: 3px dashed ${(props) => props.theme.palette.third.main};
        background-color: rgba(246, 80, 38, 0.1);
    }
`;

export const CloseIcon = styled(CIcon).attrs({
    sx: {
        color: 'red',
        fontSize: '2.5rem',
    },
})``;

export const ModalContainer = styled(Box).attrs({
    width: 400,
    height: 350,
    bgcolor: 'background.paper',
    boxShadow: 24,
    zIndex: 1000,
    marginBottom: '10%',
    position: 'relative',
})`
    padding: 0 25px 16px 25px;
`;

export const ModalTitle = styled(Typography).attrs({
    variant: 'h5',
    fontWeight: 600,
    marginBottom: '20px',
})``;

export const ModalDescription = styled(Typography).attrs({
    variant: 'body1',
    paddingLeft: '10px',
})``;

export const ButtonsWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    bottom: 15px;
    left: 0;
    padding: 0 20px;
`;

export const ModalButton = styled(Button).attrs((props) => ({
    variant: 'contained',
    size: 'large',
    sx: {
        backgroundColor: `${props.theme.palette.primary.main}`,
        minWidth: '35%',
        maxWidth: '45%',
        height: 'auto',
    },
}))`
    :hover {
        background-color: ${(props) => props.theme.palette.primary.dark};
    }
`;
