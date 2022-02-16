import { useState, useEffect } from 'react';

const mobile_max_width = 480;

const useIsMobile = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(width < mobile_max_width);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
    setIsMobile(window.innerWidth < mobile_max_width);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return {
    isMobile,
  };
};

export default useIsMobile;
