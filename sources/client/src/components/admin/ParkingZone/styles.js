import styled from 'styled-components';
import { Typography, Divider } from '@mui/material';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import { mobile_max_width } from '../../../config/utilities';
import CircularProgress from '@mui/material/CircularProgress';

export const NamesWrapper = styled.div`
  margin-bottom: 10px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10%;

  @media (max-width: ${mobile_max_width}px) {
    flex-direction: column;
    .zone-name {
      margin-top: 30px;
    }
  }
`;

export const ParkingAndZoneName = styled(Typography).attrs((props) => ({
  fontSize: '2rem',
  fontWeight: '600',
  margin: 0,
  color: `${props.theme.palette.primary.main}`,
}))`
  display: flex;
  align-items: center;
`;

export const ZoneNameLoader = styled(CircularProgress).attrs({
  size: 40,
  sx: {
    marginLeft: '10px',
  },
})`
  .MuiCircularProgress-svg {
    color: ${(props) => props.theme.palette.primary.light};
  }
`;

export const DividerUnderNames = styled(Divider).attrs({
  variant: 'middle',
  sx: {
    margin: '0 9%',
    borderWidth: '2px',
    borderBottomWidth: 'thin',
  },
})``;

export const MapsIcon = styled(MapOutlinedIcon).attrs((props) => ({
  sx: {
    width: props.$isactive ? '60px' : '50px',
    height: props.$isactive ? '60px' : '50px',
    color: props.$isactive ? `${props.theme.palette.primary.main}` : '',
  },
}))``;

export const ComponentIcon = styled(EqualizerOutlinedIcon).attrs((props) => ({
  sx: {
    width: props.$isactive ? '60px' : '50px',
    height: props.$isactive ? '60px' : '50px',
    color: props.$isactive ? `${props.theme.palette.primary.main}` : '',
  },
}))``;

export const NavigationIconsWrapper = styled.div`
  height: 86px;
  width: 160px;
  display: flex;
  justify-content: space-between;
  align-self: center;
`;

export const MainSection = styled.div`
  height: 100%;
`;
