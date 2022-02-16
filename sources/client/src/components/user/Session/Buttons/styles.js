import styled from 'styled-components';
import { Button } from '@mui/material';

export const RoundWrapper = styled(Button).attrs({})`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 1px dashed black;
    box-shadow: 0 0 7px 3px black;
    flex-direction: column;
    color: black;
    text-align: center;
`;

export const FuncText = styled.h2`
    font-style: italic;
    font-weight: 600;
    margin: 0;
    margin-top: 20px;
`;

export const HelperText = styled.h6`
    text-decoration: underline;
    margin: 0;
    margin-top: 40px;
`;

export const PayButton = styled(Button).attrs((props) => ({
    variant: 'contained',
    size: 'large',
    sx: {
        backgroundColor: `#008080
        `,
        width: '200px',
    },
}))`
    font-size: 25px;
    font-style: italic;
    box-shadow: 1px 1px 5px 1px black;
    margin-top: 5vh;
    :hover {
        background-color: #007070;
    }
`;
