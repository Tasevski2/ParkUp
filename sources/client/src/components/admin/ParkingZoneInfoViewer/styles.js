import styled from 'styled-components';
import EditI from '@mui/icons-material/Edit';

export const RightSideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 500px;
  position: relative;
`;

export const EditIcon = styled(EditI).attrs((props) => ({
  sx: {
    fontSize: '3rem',
    border: `3px solid ${props.theme.palette.third.main}`,
    color: props.theme.palette.third.main,
    padding: '5px',
  },
}))`
  :hover {
    background-color: rgba(246, 80, 38, 0.1);
    border: 3px dashed ${(props) => props.theme.palette.third.main};
  }
`;
