import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { LineProgressBar } from '@frogress/line';
import { mobile_max_width } from '../../../../config/utilities';

export const ParkingZoneWrapper = styled(Grid)`
  height: 350px;

  @media (max-width: ${mobile_max_width}px) {
    padding-left: 15px !important;
    padding-right: 15px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  box-shadow: 15px 15px 10px ${(props) => props.theme.palette.background.shadow};
  background-color: ${(props) => props.theme.palette.background.white};
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
  position: relative;
`;

export const ZoneName = styled(Typography).attrs({
  variant: 'h2',
})`
  font-size: 2rem;
  font-weight: 600;
  margin-top: 30px;
  text-align: center;
`;

export const InfoWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Label = styled(Typography).attrs({
  variant: 'h4',
})`
  font-size: 1rem;
  margin-bottom: 5px;
`;

export const Value = styled(Typography).attrs({
  variant: 'h3',
})`
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 5px;
`;

export const ProgressBar = styled(LineProgressBar).attrs((props) => ({
  stripe: true,
  progressColor: props.theme.palette.primary.main,
  height: '30px',
}))`
  position: absolute;
  bottom: 5px;
`;

export const ProgressBarLabel = styled.p`
  margin: 0 0 0 42.5%;
  line-height: 30px;
  position: absolute;
  font-weight: 500;
`;
