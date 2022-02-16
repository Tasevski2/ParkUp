import styled, { keyframes } from 'styled-components';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import Button from '@mui/material/Button';

const breath = keyframes`
  0% {
    opacity: 0.4;
    transform: scale(0.7);
    transform: translate(-50%, -50%);
  }
  25% {
    opacity: 0.6;
    transform: scale(0.8);
    transform: translate(-50%, -50%);
  }
  50% {
    opacity: 0.8;
    transform: scale(0.9);
    transform: translate(-50%, -50%);
  }
  100% {
    opacity: 0.1;
    transform: scale(1.1);
    transform: translate(-50%, -50%);
  }
`;

const buttonBreath = keyframes`
  0% {
    transform: scale(0.8) ;
  }
  25% {
    transform: scale(0.85) ;
  }
  50% {
    transform: scale(0.9) ;
  }
  75% {
    transform:  scale(0.95) ;
  }
  100% {
    transform: scale(1) ;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 66px);
  padding: 10px 0;
  position: relative;
`;

export const ParkingSpace = styled.div`
  width: 50%;
  height: 40vh;
  margin: auto;
  position: relative;
  border: 10px solid white;
  border-bottom: 0;
`;

export const ParkingIcon = styled(LocalParkingIcon).attrs({
  sx: {
    fontSize: 120,
  },
})`
  color: ${(props) => props.theme.palette.primary.dark};
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  animation: ${breath} 2s linear infinite normal;
`;

export const ParkingSpaceHelper = styled.div`
  position: absolute;
  width: 20%;
  border-bottom: 10px solid white;
`;

export const ArrowsWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 50vh;
  bottom: 10vh;
`;

export const CarWrapper = styled.div`
  width: 35%;
  height: 35vh;
  position: absolute;
  bottom: 5vh;
  left: 50%;
  transform: translateX(-50%);
`;

export const Car = styled.img`
  width: 32%;
  height: 30vh;
  z-index: 1000;
  position: absolute;
  bottom: 5vh;
  left: 34%;
  // transform: transalteX(-50%);
`;

export const PreviewCar = styled.img`
  width: 35%;
  height: 30vh;
  z-index: 1001;
`;

export const YouAreParkedButton = styled(Button).attrs((props) => ({
  variant: 'contained',
  size: 'large',
  sx: {
    backgroundColor: `${props.theme.palette.primary.main}`,
  },
}))`
  position: absolute;
  left: 20%;
  bottom: 20vh;
  width: fit-content;
  font-size: 25px;
  animation: ${buttonBreath} 2s linear infinite alternate;
  :hover {
    background-color: ${(props) => props.theme.palette.primary.dark};
  }
`;
