import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import PhoneI from '@mui/icons-material/Phone';
import PersonI from '@mui/icons-material/Person';
import { MenuItem, Select } from '@mui/material';

export const SessionInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 25px 15px 25px;
`;

export const Input = styled(TextField).attrs({
    fullWidth: true,
    sx: {
        marginTop: '20px',
    },
})`
    > div {
        padding-left: 10px;
    }
    input {
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

export const PersonIcon = styled(PersonI).attrs({
    sx: {
        fontSize: '2rem',
        color: 'white',
    },
})``;

export const PhoneIcon = styled(PhoneI).attrs({
    sx: {
        fontSize: '2rem',
        color: 'white',
    },
})``;

export const PlateAndZoneWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

export const ZoneSelectInput = styled(Select).attrs({})`
    text-align: center;
    position: relative;
    width: 49%;
    #mui-component-select-zone {
        font-size: 1.5rem;
        padding: 25px 30px 0 15px;
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
        top: 40px;
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

export const DropdownItem = styled(MenuItem).attrs({})`
    justify-content: center;
    border-top: 1px solid grey;
    :first-of-type {
        border: 0;
    }
`;
