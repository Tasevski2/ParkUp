import styled, { keyframes } from 'styled-components';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const flash = keyframes`
0% { 
    opacity: 0;
}
25% { 
    opacity: 0.33;
}
50% { 
    opacity: 0.66;
}
100% { 
    opacity: 1;
}
`;

const speed = `1.8s`;
const multipy_by = 30;
const add = 0;
const delay = 0.15;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;

  .arrow-0 {
    animation: ${flash} ${speed} infinite ${9 * delay}s;
  }
  .arrow-1 {
    top: ${1 * multipy_by + add}px;
    animation: ${flash} ${speed} infinite ${8 * delay}s;
  }
  .arrow-2 {
    top: ${2 * multipy_by + add}px;
    animation: ${flash} ${speed} infinite ${7 * delay}s;
  }
  .arrow-3 {
    top: ${3 * multipy_by + add}px;
    animation: ${flash} ${speed} infinite ${6 * delay}s;
  }
  .arrow-4 {
    top: ${4 * multipy_by + add}px;
    animation: ${flash} ${speed} infinite ${5 * delay}s;
  }
  .arrow-5 {
    top: ${5 * multipy_by + add}px;
    animation: ${flash} ${speed} infinite ${4 * delay}s;
  }
  .arrow-6 {
    top: ${6 * multipy_by + add}px;
    animation: ${flash} ${speed} infinite ${3 * delay}s;
  }
  .arrow-7 {
    top: ${7 * multipy_by + add}px;
    animation: ${flash} ${speed} infinite ${2 * delay}s;
  }
  .arrow-8 {
    top: ${8 * multipy_by + add}px;
    animation: ${flash} ${speed} infinite ${1 * delay}s;
  }
  .arrow-9 {
    top: ${9 * multipy_by + add}px;
    animation: ${flash} ${speed} infinite;
  }
`;

export const Arrow = styled(ArrowBackIosNewIcon).attrs((props) => ({
  sx: {
    fontSize: 80,
    color: props.theme.palette.primary.dark,
    transform: 'rotate(90deg)',
    position: 'absolute',
    // opacity: 0,
  },
}))``;
