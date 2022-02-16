import { useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Header,
  MenuBurgerIcon,
  LogoWrapper,
  Logo,
  NavBar,
  NavBarTitles,
  HeaderLogoWrapper,
} from './styles';
import IconButton from '@mui/material/IconButton';

import { roles } from '../../config/enums';
import { AccessoriesContext } from '../../context/AccessoriesContext';
import { UserContext } from '../../context/UserContext';
import logo from '../../resources/logo.jpg';
import logoImg from '../../resources/logo_2_transparent_bg.png';

const HeaderUserAndAuth = () => {
  const { user } = useContext(UserContext);
  const { setIsOpenDrawer, isMobile } = useContext(AccessoriesContext);
  const path = useLocation().pathname;

  const isUserLandingPage = user && user.role === roles.user && path == '/';
  return (
    <>
      {!isMobile ? null : (
        <Header>
          <IconButton onClick={() => setIsOpenDrawer(true)}>
            <MenuBurgerIcon />
          </IconButton>
          {isUserLandingPage ? (
            <HeaderLogoWrapper>
              <Logo src={logo} />
            </HeaderLogoWrapper>
          ) : null}
        </Header>
      )}
      {isUserLandingPage ? null : (
        <LogoWrapper>
          <Logo src={logo} />
        </LogoWrapper>
      )}
      {user || isMobile ? null : (
        <NavBar>
          <NavBarTitles $isSelected={path === '/maps'}>
            <Link to='/maps'>Мапа</Link>
          </NavBarTitles>
          <NavBarTitles
            $isSelected={path === '/login' || path === '/login-guest'}
          >
            <Link to='/login'>Најави Се</Link>
          </NavBarTitles>
          <NavBarTitles $isSelected={path === '/register'}>
            <Link to='/register'>Регистрирај Се</Link>
          </NavBarTitles>
        </NavBar>
      )}
    </>
  );
};

export default HeaderUserAndAuth;
