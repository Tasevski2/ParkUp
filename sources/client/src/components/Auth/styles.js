import styled from 'styled-components';
import backgroundImage from '../../resources/login_background.jpg';
import { mobile_max_width } from '../../config/utilities';

export const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  // background-image: url(${backgroundImage});
  border-radius: 10px;
  // height: calc(100vh - 266px);
  @media (min-width: ${mobile_max_width}px) {
    max-height: 750px;
  }
`;
