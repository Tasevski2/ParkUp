import styled from 'styled-components';
import CIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    max-width: 500px;
    border-radius: 10px;
    position: relative;
`;

export const ButtonWrapper = styled.div`
    bottom: 0;
    margin: auto;
    margin-top: 5vh;
`;

export const ModalContainer = styled(Box).attrs({
    width: 350,
    minHeight: 421,
    bgcolor: '#2b7878fa',
    boxShadow: 24,
    zIndex: 100,
    marginBottom: '10%',
    color: 'whiteSmoke',
})`
    padding-bottom: 16px;
    display: flex;
    flex-direction: column;
    align-content: center;
    position: relative;
`;

export const CloseIcon = styled(CIcon).attrs({
    sx: {
        color: 'red',
        fontSize: '2.5rem',
    },
})``;

export const KeyValueWrapper = styled.div`
    text-align: center;
    margin-bottom: 20px;
`;

export const Key = styled.p`
    margin: 0;
    margin-bottom: 10px;
    font-size: 1.15rem;
`;

export const Value = styled.p`
    margin: 0;
    font-weight: 600;
    font-size: 1.25rem;
`;

export const PaymentMethodWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const PayWithText = styled.p`
    margin: 0;
    display: inline-block;
    font-size: 1.15rem;
    margin-right: 40px;
`;

export const PaymentMethodsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    span {
        font-size: 1.15rem;
        font-weight: 600;
    }
`;

export const PayButtonWrapper = styled.div`
    width: 100%;
    text-align: center;
    margin-top: 50px;
`;

export const ModalPayButton = styled(Button).attrs((props) => ({
    variant: 'contained',
    size: 'large',
    sx: {
        backgroundColor: `${props.theme.palette.primary.main}`,
        fontSize: '1.25rem',
    },
}))`
    :hover {
        background-color: ${(props) => props.theme.palette.primary.dark};
    }
`;

export const CardDetails = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 30px;
`;

export const DateAndCCVWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    padding-right: 5%;
`;

export const ModalInput = styled(TextField).attrs({
    fullWidth: true,
    sx: {
        marginTop: '10px',
        padding: 0,
    },
})`
    input {
        text-align: center;
        font-size: 1.15rem;
        font-weight: 500;
        border: 2px solid ${(props) => props.theme.palette.primary.main};
        border-radius: 10px;
        width: 100%;
        color: whiteSmoke;
        :focus {
            border: 2px dashed ${(props) => props.theme.palette.primary.main};
        }
        ::placeholder {
            opacity: 0.6;
        }
    }
    > div {
        padding: 0;
    }
    fieldset,
    .Mui-focused {
        border: 0;
    }
`;

export const ModalInputCardNumber = styled(ModalInput)`
    input {
        padding-left: 42px;
    }
    fieldset {
        position: relative;
    }
`;

export const CreditCard = styled(CreditCardIcon).attrs((props) => ({
    sx: {
        fontSize: '2rem',
        color: `${props.theme.palette.primary.main}`,
        position: 'absolute',
        marginLeft: '10px',
    },
}))``;
