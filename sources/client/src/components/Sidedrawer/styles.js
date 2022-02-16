import styled from 'styled-components';
import { Divider } from '@mui/material';
import CloseI from '@mui/icons-material/Close';
import backgroundImage from '../../resources/login_background.jpg';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dashboard from '@mui/icons-material/Dashboard';
import Logout from '@mui/icons-material/Logout';
import SupervisorAccount from '@mui/icons-material/SupervisorAccount';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

export const DrawerContainer = styled(Box).attrs((props) => ({
  sx: {
    width: '250px',
    height: '100%',
    backgroundImage: `url(${backgroundImage})`,
  },
}))`
  ul:first-of-type {
    padding-top: 35px;
    span {
      font-size: 1.5rem;
      color: whiteSmoke;
      font-weight: 600;
      margin-left: 10px;
    }

    svg {
      margin: 0;
      color: whiteSmoke;
      width: 40px;
      height: 40px;
    }
  }

  ul:last-of-type {
    position: absolute;
    bottom: 15px;
    width: 100%;

    span {
      font-size: 1rem;
      color: whiteSmoke;
      font-weight: 600;
    }
    li:first-of-type svg {
      color: whiteSmoke;
    }
  }
  #err-color {
    span {
      color: ${(props) => props.theme.palette.error.main};
    }
  }
`;

export const DividerUnderListItem = styled(Divider).attrs({
  variant: 'middle',
  sx: {
    margin: '5px 5%',
    borderWidth: '2px',
    borderBottomWidth: 'thin',
    borderColor: 'whiteSmoke',
  },
})``;

export const DividerUnderList = styled(Divider).attrs({
  variant: 'fullWidth',
  sx: {
    marginTop: '15px',
    marginBottom: '25px',
    borderWidth: '2px',
    borderBottomWidth: 'thin',
    borderColor: 'whiteSmoke',
  },
})``;

export const CloseIcon = styled(CloseI).attrs((props) => ({
  sx: {
    fontSize: 50,
    color: `${props.theme.palette.error.main}`,
  },
}))``;

export const DashboardIcon = styled(Dashboard).attrs((props) => ({
  sx: {
    fontSize: 35,
  },
}))`
  margin-bottom: 15px;
`;

export const CarIcon = styled(DirectionsCarIcon).attrs((props) => ({
  sx: {
    fontSize: 35,
  },
}))``;

export const ProfileIcon = styled(PersonOutlinedIcon).attrs((props) => ({
  sx: {
    fontSize: 35,
  },
}))``;

export const TimerIcon = styled(TimerOutlinedIcon).attrs((props) => ({
  sx: {
    fontSize: 35,
  },
}))``;

export const MapIcon = styled(MapOutlinedIcon).attrs((props) => ({
  sx: {
    fontSize: 35,
  },
}))``;

export const SupervisorAccountIcon = styled(SupervisorAccount).attrs(
  (props) => ({
    sx: {
      fontSize: 35,
    },
  })
)``;

export const UserIcon = styled(AccountCircleIcon).attrs((props) => ({
  sx: {
    fontSize: 30,
  },
}))``;

export const LoginIcon = styled(LoginOutlinedIcon).attrs((props) => ({
  sx: {
    fontSize: 30,
  },
}))``;

export const RegistrationIcon = styled(AppRegistrationIcon).attrs((props) => ({
  sx: {
    fontSize: 30,
    color: props.theme.palette.background.whiteSmoke,
  },
}))``;

export const LogoutIcon = styled(Logout).attrs((props) => ({
  sx: {
    fontSize: 30,
    color: `${props.theme.palette.error.main}`,
  },
}))``;
