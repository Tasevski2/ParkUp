import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';

export const Header = styled.div`
  width: 100%;
  height: 66px;
  background-color: #f2f2f2;
  padding-left: 7px;
  padding-right: 15px;
  display: flex;
  justify-content: space-between;
`;

export const HeaderLogoWrapper = styled.div`
  width: 100px;
  height: 100%;
`;

export const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;
  padding-top: 15px;
  width: 100%;
`;

export const NavBarTitles = styled.h3`
  text-align: center;
  display: inline-block;
  border-bottom: ${(props) =>
    props.$isSelected ? `3px solid ${props.theme.palette.third.main}` : 0};
  padding-bottom: 10px;
  margin: 0;
  a {
    color: ${(props) =>
      props.$isSelected ? props.theme.palette.third.main : 'whiteSmoke'};
    text-decoration: none;
  }
`;

export const MenuBurgerIcon = styled(MenuIcon).attrs((props) => ({
  sx: {
    fontSize: 50,
    color: `${props.theme.palette.primary.main}`,
  },
}))``;

export const LogoWrapper = styled.div`
  width: 100%;
  height: 200px;
`;

export const Logo = styled.img`
  width: 100%;
  height: 100%;
`;
