import styled from 'styled-components';
import { Typography } from '@mui/material';
import { Divider } from '@mui/material';

import Logout from '@mui/icons-material/Logout';
import Dashboard from '@mui/icons-material/Dashboard';
import SupervisorAccount from '@mui/icons-material/SupervisorAccount';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import CloseI from '@mui/icons-material/Close';
import { mobile_max_width } from '../../config/utilities';
import backgroundImage from '../../resources/login_background.jpg';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  flex: 1;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 7%;
  position: fixed;
  z-index: 100;
  background-color: ${(props) => props.theme.palette.background.whiteSmoke};
  @media (max-width: ${mobile_max_width}px) {
    padding-left: 15px;
  }
`;

export const DividerUnderHeader = styled(Divider).attrs({
  variant: 'middle',
  sx: {
    margin: '0 5%',
    marginTop: '75px',
    borderWidth: '2px',
    borderBottomWidth: 'thin',
  },
})``;

export const TitleAndLogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const HeaderTitle = styled(Typography).attrs({
  variant: 'h1',
  fontWeight: 600,
})`
  color: ${(props) => props.theme.palette.primary.main};
  font-size: 2.5rem;
  display: flex;
`;

export const Logo = styled.img`
  width: 100%;
  height: 100%;
`;

export const LogoWrapper = styled.div`
  height: 100%;
  width: 50px;
`;

export const UserNameAndLogoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const UserName = styled(Typography).attrs({
  variant: 'h3',
})`
  margin-left: 10px;
  margin-right: 20px;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.palette.primary.main};
`;

export const LogoutIcon = styled(Logout).attrs((props) => ({
  sx: {
    fontSize: 30,
    color: `${props.theme.palette.error.main}`,
  },
}))``;

export const HeaderAndMainSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 70px;
  background-color: ${(props) => props.theme.palette.background.whiteSmoke};

  @media (max-width: ${mobile_max_width}px) {
    padding-left: 0;
  }
`;

export const SideMenu = styled.div`
  flex-direction: column;
  width: 70px;
  padding: 20px 10px 0 10px;
  border-right: 1px solid grey;
  position: fixed;
  height: 100%;
  background-color: ${(props) => props.theme.palette.primary.main};
`;

export const DashboardIcon = styled(Dashboard).attrs((props) => ({
  sx: {
    fontSize: 35,
    color: props.theme.palette.background.white,
  },
}))`
  margin-bottom: 15px;
`;

export const SupervisorAccountIcon = styled(SupervisorAccount).attrs(
  (props) => ({
    sx: {
      fontSize: 35,
      color: props.theme.palette.background.white,
    },
  })
)``;

export const UserIcon = styled(AccountCircleIcon).attrs((props) => ({
  sx: {
    fontSize: 30,
    color: `${props.theme.palette.primary.main}`,
  },
}))``;

export const MainSection = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
`;

export const MenuBurgerIcon = styled(MenuIcon).attrs((props) => ({
  sx: {
    fontSize: 50,
    color: `${props.theme.palette.primary.main}`,
  },
}))``;
