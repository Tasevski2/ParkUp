import styled from 'styled-components';
import { Button } from '@mui/material';
import PhoneI from '@mui/icons-material/Phone';
import TextField from '@mui/material/TextField';
import PersonI from '@mui/icons-material/Person';
import LockI from '@mui/icons-material/Lock';
import EditI from '@mui/icons-material/Edit';
import CancelI from '@mui/icons-material/Cancel';
import SaveI from '@mui/icons-material/Save';
import LockOpenI from '@mui/icons-material/LockOpen';

export const Wrapper = styled.div`
    text-align: center;
`;

export const CredentialsWrapper = styled.div`
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
    border-bottom: 4px solid white ;
    border-radius: 25px;
    padding: 0 10px;
  }
`;

export const LockIcon = styled(LockI).attrs({
  sx: {
    fontSize: '2rem',
    color: 'white',
  },
})``;

export const LockOpenIcon = styled(LockOpenI).attrs({
    sx: {
        fontSize: '2rem',
        color: 'white',
    },
})``;

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

const EditIcon = styled(EditI).attrs({
    sx: {
        width: '1.5rem',
        height: '100%'
    }
})``;

const CancelIcon = styled(CancelI).attrs({
  sx: {
    width: '1.5rem',
    height: '100%',
  },
})``;

const SaveIcon = styled(SaveI).attrs({
  sx: {
    width: '1.5rem',
    height: '100%',
  },
})``;

export const SaveButton = styled(Button).attrs((props) => ({
  variant: 'contained',
  size: 'large',
  sx: {
    width: '40%',
    backgroundColor: 'white',
  },
  startIcon: <SaveIcon />,
}))`
  color: ${(props) => props.theme.palette.primary.main};
  box-shadow: 5px 5px 10px ${(props) => props.theme.palette.background.shadow};
  border-radius: 15px;
  font-size: 1.2rem;
  font-weight: 600;
  :hover {
    background-color: ${(props) => props.theme.palette.background.whiteSmoke};
  }
`;

export const CancelButton = styled(Button).attrs((props) => ({
  variant: 'contained',
  size: 'large',
  sx: {
    width: '35%',
    backgroundColor: 'white',
  },
  startIcon: <CancelIcon />,
}))`
  color: ${(props) => props.theme.palette.error.main};
  box-shadow: 5px 5px 10px ${(props) => props.theme.palette.background.shadow};
  border-radius: 15px;
  font-size: 1rem;
  font-weight: 600;
  :hover {
    background-color: ${(props) => props.theme.palette.background.whiteSmoke};
  }
`;

export const EditButton = styled(Button).attrs((props) => ({
    variant: 'contained',
    size: 'large',
    startIcon: <EditIcon />,
    sx: {
        width: '40%',
        backgroundColor: 'white',
    },
}))`
    margin-top: 5vh;
    box-shadow: 5px 5px 10px ${(props) => props.theme.palette.background.shadow};
    color: ${(props) => props.theme.palette.third.main};
    border-radius: 15px;
    font-size: 1.2rem;
    font-weight: 600;
    :hover {
        background-color: ${(props) =>
            props.theme.palette.background.whiteSmoke};
    }
`;

export const FullNameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const ButtonsWrapper = styled.div`
    margin-top: 5vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 25px;
`;