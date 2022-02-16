import styled from 'styled-components';
import { MenuItem, Select } from '@mui/material';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100%;
    max-width: 500px;
    position: relative;
`;

export const GoogleMapsWrapper = styled.div`
    height: 40vh;
    width: 100%;
    margin-bottom: 10px;
    > div {
        padding: 0;
        height: 100%;
        border-radius: 15px;
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

export const FreeParkingSpacesText = styled.p`
    font-size: 1.5rem;
    font-weight: 600;
    color: ${(props) => props.theme.palette.primary.light};
    margin: 0;
    top: 5px;
    position: absolute;
    margin: auto;
    z-index: 100;
`;

export const ZoneInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
    margin-top: 20px;
    color: whiteSmoke;
`;

export const KeyValueWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Key = styled.p`
    margin: 0;
    margin-bottom: 5px;
    font-size: 1.25rem;
`;

export const Value = styled.h3`
    margin: 0;
    font-size: 1.375rem;
    font-weight: 600;
`;
