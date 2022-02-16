import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SaveI from '@mui/icons-material/Save';
import { MenuItem, Select } from '@mui/material';

export const SessionInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5vh 25px 15px 25px;
    margin-bottom: 6.5vh;
`;

export const Input = styled(TextField).attrs({
    fullWidth: true,
})`
    height: 59.44px;
    input {
        text-align: center;
        color: white !important;
        font-size: 1.2rem;
        padding-left: 10px;

        ::placeholder {
            opacity: 0.6;
        }
        :disabled {
            -webkit-text-fill-color: white;
        }
    }
    fieldset {
        border: 0;
        border-bottom: 4px solid white !important;
        border-radius: 25px;
        padding: 0 10px;
    }
`;

export const PlateAndAddPlateBtnWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${(props) => (props.center ? 'center' : 'space-between')};
    align-items: flex-end;
    width: 100%;
    margin-bottom: 5vh;
    .MuiCircularProgress-svg {
        color: ${(props) => props.theme.palette.third.main};
    }
`;

export const ZoneSelectInput = styled(Select).attrs({})`
    text-align: center;
    position: relative;
    width: 49%;
    color: white;
    #mui-component-select-zone {
        font-size: 1.5rem;
        padding: 16.5px 30px 16.5px 10px;
        color: white !important;
        font-size: 1.2rem;

        ::placeholder {
            opacity: 0.6;
        }
        :disabled {
            -webkit-text-fill-color: white;
        }
    }
    svg {
        right: 10px;
        color: white !important;
        display: ${(props) => (!props.$show ? 'none' : '')};
    }
    fieldset {
        border: 0;
        border-bottom: 4px solid white !important;
        border-radius: 25px;
        padding: 0 10px;
    }
`;

export const PlateSelectInput = styled(ZoneSelectInput)`
    color: white;
    font-weight: 500;
    font-size: 1.15rem;
`;

export const DropdownItem = styled(MenuItem).attrs({})`
    justify-content: center;
    border-top: 1px solid grey;
    :first-of-type {
        border: 0;
    }
`;

export const PlateDropdownItem = styled(MenuItem).attrs({})`
    justify-content: space-between;
    border-top: 1px solid grey;
    padding-right: 5px;
    padding-left: 10px;
    :first-of-type {
        border: 0;
    }
`;

export const AddIcon = styled(AddCircleOutlineIcon).attrs({
    sx: {
        fontSize: '2.5rem',
    },
})`
    margin-right: 11px;
`;

export const RemoveIcon = styled(RemoveCircleIcon).attrs({
    sx: {
        fontSize: '2.2rem',
        color: 'red',
    },
})``;

export const SaveIcon = styled(SaveI).attrs({
    sx: {
        fontSize: '2.5rem',
    },
})`
    margin-right: 11px;
`;

export const AddPlate = styled(Button).attrs((props) => ({
    variant: 'contained',
    size: 'small',
    sx: {
        backgroundColor: `whiteSmoke`,
        color: `${props.theme.palette.primary.main}`,
        fontWeight: 600,
        fontSize: 16,
        height: 59.44,
    },
}))`
    :hover {
        background-color: #dcdcdc;
    }
`;

export const SavePlate = styled(Button).attrs((props) => ({
    variant: 'contained',
    size: 'small',
    sx: {
        backgroundColor: `whiteSmoke`,
        color: `${props.theme.palette.third.main}`,
        fontWeight: 600,
        fontSize: 16,
        height: 59.44,
    },
}))`
    :hover {
        background-color: #dcdcdc;
    }
`;
