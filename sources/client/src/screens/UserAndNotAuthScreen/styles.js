import styled from 'styled-components';
import backgroundImage from '../../resources/login_background.jpg';
import backgroundAsphalt from '../../resources/asphalt_texture1.jfif';
import { mobile_max_width } from '../../config/utilities';

export const ScreenWrapper = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 8vh;
`;

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  //   background-color: ${(props) =>
    props.theme.palette.background.whiteSmoke};
  background-image: url(${(props) =>
    props.asphaltBg ? backgroundAsphalt : backgroundImage});
  position: relative;

  @media (min-width: ${mobile_max_width}px) {
    width: ${mobile_max_width}px;
    height: 750px;
    min-height: 0;
    margin: auto;
  }
`;
