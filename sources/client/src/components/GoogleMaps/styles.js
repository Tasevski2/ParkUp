import styled from 'styled-components';
import { mobile_max_width } from '../../config/utilities';

export const Wrapper = styled.div`
    width: 100%;
    height: 69vh;
    padding: 0 4vh;

    @media (max-width: ${mobile_max_width}px) {
        height: 50vh;
    }
`;

export const Marker = styled.div`
  color: white;
  width: 30px;
  height: 25px;
  background-color: ${(props) =>
      props.$isTaken
          ? `${props.theme.palette.error.main}`
          : `${props.theme.palette.success.light}`}};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  transform: translate(-50%, -100%);
`;
