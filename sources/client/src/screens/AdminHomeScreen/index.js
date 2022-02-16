import { useContext, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import {
  Container,
  Header,
  TitleAndLogoWrapper,
  LogoWrapper,
  Logo,
  HeaderTitle,
  UserNameAndLogoutWrapper,
  UserName,
  LogoutIcon,
  HeaderAndMainSectionWrapper,
  SideMenu,
  DashboardIcon,
  SupervisorAccountIcon,
  MainSection,
  DividerUnderHeader,
  UserIcon,
  MenuBurgerIcon,
} from './styles';

import IconButton from '@mui/material/IconButton';

import logo from '../../resources/logo_2_transparent_bg.png';
import { roles } from '../../config/enums';
import DestinationComponent from '../../utils/DestinationComponent';
import onClickRouting from '../../utils/onClickRouting';
import AbsoluteLoader from '../../components/Loaders/AbsoluteLoader';

import ParkingZones from '../../components/admin/ParkingZones';
import EmployeesTable from '../../components/admin/EmployeesTable';
import EmployeeEdit from '../../components/admin/EmployeeEdit';
import EmployeeCreate from '../../components/admin/EmployeeCreate';
import ParkingZone from '../../components/admin/ParkingZone';

import { UserContext } from '../../context/UserContext';
import { AccessoriesContext } from '../../context/AccessoriesContext';
import useLogoutUser from '../../hooks/useLogoutUser';

const ToParkingZones = new DestinationComponent('/', ParkingZones, true);
const ToEmployeesTable = new DestinationComponent(
  '/employees',
  EmployeesTable,
  true
);
const ToEmployeeCreate = new DestinationComponent(
  '/employees/create',
  EmployeeCreate,
  true
);
const ToEmployeeEdit = new DestinationComponent(
  '/employees/:employeeId',
  EmployeeEdit,
  true
);
const ToParkingZone = new DestinationComponent(
  '/zone/:zone_id',
  ParkingZone,
  true
);

const adminRoutes = [
  ToParkingZones,
  ToEmployeesTable,
  ToEmployeeCreate,
  ToEmployeeEdit,
  ToParkingZone,
];

const employeeRoutes = [ToParkingZones, ToParkingZone];

const AdminHomeScreen = (props) => {
  const { user, isLoadingUser } = useContext(UserContext);
  const { isMobile, setIsOpenDrawer } = useContext(AccessoriesContext);
  let history = useHistory();
  const { logoutUser } = useLogoutUser();
  let routes = user.role === roles.admin ? adminRoutes : employeeRoutes;

  return (
    <Container>
      {isLoadingUser ? (
        <AbsoluteLoader
          containerStyle={{
            width: isMobile ? '150px' : '300px',
            height: isMobile ? '150px' : '300px',
            margin: 'auto',
          }}
        />
      ) : (
        <>
          {!isMobile ? (
            <SideMenu>
              <IconButton onClick={() => onClickRouting('/', history)}>
                <DashboardIcon />
              </IconButton>
              {user.role === roles.admin ? (
                <IconButton
                  onClick={() => onClickRouting('/employees', history)}
                >
                  <SupervisorAccountIcon />
                </IconButton>
              ) : null}
            </SideMenu>
          ) : null}

          <HeaderAndMainSectionWrapper>
            <Header>
              {isMobile ? (
                <IconButton
                  onClick={() => setIsOpenDrawer(true)}
                  style={{ padding: 0 }}
                >
                  <MenuBurgerIcon />
                </IconButton>
              ) : null}
              <TitleAndLogoWrapper>
                <LogoWrapper>
                  <Logo src={logo} />
                </LogoWrapper>
                <HeaderTitle>Park Up</HeaderTitle>
              </TitleAndLogoWrapper>

              {isMobile ? null : (
                <UserNameAndLogoutWrapper>
                  <UserIcon />
                  <UserName>
                    {user.firstName} {user.lastName}
                  </UserName>
                  <IconButton onClick={logoutUser}>
                    <LogoutIcon />
                  </IconButton>
                </UserNameAndLogoutWrapper>
              )}
            </Header>
            <DividerUnderHeader />
            <MainSection>
              <Switch>
                {routes?.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    component={route.component}
                    exact={route.exact}
                  />
                ))}
                <Redirect to='/' />
              </Switch>
            </MainSection>
          </HeaderAndMainSectionWrapper>
        </>
      )}
    </Container>
  );
};

export default AdminHomeScreen;
