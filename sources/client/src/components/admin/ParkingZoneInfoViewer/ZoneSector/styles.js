import styled from 'styled-components';
import { Typography, Divider } from '@mui/material';

export const Wrapper = styled.div`
  width: 500px;
  height: 100%;
  padding: 10px 20px;
  border: 1px solid ${(props) => props.theme.palette.background.shadow};
  box-shadow: 15px 15px 10px ${(props) => props.theme.palette.background.shadow};
`;

export const Title = styled(Typography).attrs({
  variant: 'h4',
  textAlign: 'center',
  marginBottom: '10px',
  fontSize: '1.7rem',
  fontWeight: 500,
})``;

export const DividerUnderTitle = styled(Divider).attrs({
  sx: {
    borderBottomWidth: '2px',
  },
})``;

export const Characteristics = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

export const KeyValueWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

export const Key = styled.p`
  font-size: 1.4rem;
  margin: 0;
`;

export const Value = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
  width: 50%;
`;

export const ColorCircleWrapper = styled.div`
  width: 50%;
`;
export const ColorCircle = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: ${(props) => props.$color};
  border-radius: 50%;
`;

export const ZoneCenterLocation = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

export const SmallTitle = styled(Typography).attrs({
  variant: 'h6',
  textAlign: 'center',
  marginBottom: '5px',
  fontWeight: 500,
  fontSize: '1.4rem',
})``;

export const LatLngCenter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 40px;
`;

export const LabelAndLatLngWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LatLngLabel = styled.label`
  font-size: 1.1rem;
`;

export const LatLngValue = styled.p`
  margin: 0;
  margin-top: 5px;
  font-size: 1.5rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 150px;
  border: 1px solid black;
  padding: 10px 5px;
`;

export const ZoneCornersLocation = styled.div`
  width: 100%;
  margin-top: 25px;
`;

export const TableWrapper = styled.div`
  width: 50%;
  margin: auto;
  text-align: center;

  table {
    border-spacing: 0;
    border: 1px solid black;
    border-bottom: 0;
  }

  table tbody {
    display: block;
    max-height: 200px;
    overflow-y: auto;
  }
  tbody::-webkit-scrollbar {
    display: none;
  }
  table thead,
  table tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  th,
  td {
    padding: 10px 5px;
    font-size: 1.2rem;
    text-overflow: ellipsis;
  }
  thead th:first-of-type {
    border-right: 2px solid black;
    border-bottom: 2px solid black;
  }
  thead th:last-of-type {
    border-bottom: 2px solid black;
  }
  tbody tr td:first-of-type {
    border-right: 2px solid black;
  }
  tbody tr td {
    border-bottom: 1px solid black;
  }

  tbody tr:last-of-type td {
    border-bottom: 0;
  }
`;
