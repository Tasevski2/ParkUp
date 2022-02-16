import Backdrop from '@mui/material/Backdrop';

import { Loader } from './styles';

const BackgropLoader = ({ isBackdropLoaderOpen, isMobile }) => {
  return (
    <Backdrop
      open={isBackdropLoaderOpen}
      sx={{
        zIndex: 1000,
      }}
    >
      <Loader size={isMobile ? '150px' : '250px'} />
    </Backdrop>
  );
};

export default BackgropLoader;
