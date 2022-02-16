import styled from 'styled-components';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import SIcon from '@mui/icons-material/Search';

import { mobile_max_width } from '../../../config/utilities';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 12% 0 12%;
  width: 100%;
  max-width: 1440px;
  margin: auto;
  height: 100%;
`;

export const Title = styled(Typography).attrs({
  variant: 'h3',
  fontSize: '2rem',
  fontWeight: 600,
})`
  background: -webkit-linear-gradient(#333333, #4cc5a3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;

export const StatsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin: 30px 0 10px 0;

  @media (max-width: ${mobile_max_width}px) {
    flex-direction: column;
  }
`;

export const Stats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const KeyValueWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 280px;
  justify-content: space-between;
`;

export const StatsKey = styled.p`
  margin: 0;
  background: -webkit-linear-gradient(#333333, #4cc5a3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.2rem;
`;

export const StatsValue = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 1.4rem;
  background: -webkit-linear-gradient(#333333, #4cc5a3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const SearchField = styled(TextField).attrs({
  width: '150px',
  sx: {
    marginTop: '10px',
    marginBottom: '20px',
  },
})`
  border: 1px solid ${(props) => props.theme.palette.primary.main};
  border-radius: 5px;
  fieldset {
    border: 0;
  }
  input {
    font-size: 1.1rem;
    font-weight: 500;
    padding: 15px 10px;
    color: ${(props) => props.theme.palette.primary.main};
  }
`;

export const SearchIcon = styled(SIcon).attrs((props) => ({
  sx: {
    fontSize: '2rem',
    color: `rgba(0,173,124, 0.4)`, // primary.main in rgb with opacity 0.4
  },
}))``;

export const SessionsWrapper = styled.div`
  height: auto;
  min-height: 240px;
  max-height: 380px;
  width: 100%;
  overflow: auto;
  > div:not(div:first-of-type) {
    margin-top: 24px;
  }

  @media (max-width: ${mobile_max_width}px) {
    max-height: 75vh;
    padding-bottom: 10px;
  }
`;
