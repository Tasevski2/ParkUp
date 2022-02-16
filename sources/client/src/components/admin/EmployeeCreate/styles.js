import styled from 'styled-components';
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import VIcon from '@mui/icons-material/Visibility';
import VOffIcon from '@mui/icons-material/VisibilityOff';

export const EmployeeEditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  border: 1px solid whiteSmoke;
  border-radius: 10px;
  padding: 10px 20px;
  margin-top: 20px;
  margin-left: 30px;
  background-color: white;
  box-shadow: 15px 15px 10px ${(props) => props.theme.palette.background.shadow};
`;

export const Title = styled(Typography).attrs({})`
  border-bottom: 2px solid rgba(0, 0, 0, 0.12);
  padding-bottom: 10px;
  margin-bottom: 15px;
`;

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 25px;
  position: relative;
`;

export const LabelAndInputWrapper = styled.div``;

export const Label = styled(InputLabel).attrs({})``;

export const StandardInputField = styled(TextField).attrs({})`
  width: 300px;
`;

export const VisibilityIcon = styled(VIcon).attrs({
  sx: {
    fontSize: '2rem',
  },
})``;

export const VisibilityOffIcon = styled(VOffIcon).attrs({
  sx: {
    fontSize: '2rem',
  },
})``;

export const Dropdown = styled(Select).attrs({})`
  width: 300px;
`;

export const DropdownOption = styled(MenuItem).attrs({})`
  > span {
    color: ${(props) => props.theme.palette.primary.main};
    svg {
      color: ${(props) => props.theme.palette.primary.main};
    }
  }
  > div > span {
    font-size: 1.3rem;
  }
`;

export const SwitchRowWrapper = styled.div`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 50px;
`;

export const SwitchTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 5px;
`;

export const SwitchLabelAndInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const AccountSwitch = styled(Switch).attrs((props) => ({}))`
  .MuiSwitch-switchBase {
    color: red;
  }
  .MuiSwitch-track {
    background-color: red;
  }
  .MuiSwitch-switchBase.Mui-checked {
    color: ${(props) => props.theme.palette.primary.main};
  }
  .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {
    background-color: ${(props) => props.theme.palette.primary.main};
  }
`;

export const BackButton = styled(Button).attrs({
  variant: 'outlined',
})`
  margin-right: 15px;
  :hover {
    border: 2px solid;
    font-weight: 600;
  }
`;

export const SaveChangesButton = styled(Button).attrs((props) => ({
  variant: 'contained',
  sx: {
    backgroundColor: `${props.theme.palette.primary.main}`,
  },
}))`
  padding: 10px 16px;
  :hover {
    background-color: ${(props) => props.theme.palette.primary.dark};
  }
`;
