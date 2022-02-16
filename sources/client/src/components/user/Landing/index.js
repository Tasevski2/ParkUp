import { useContext, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import useGetData from '../../../hooks/useGetData';
import {
  Wrapper,
  ParkingSpace,
  ParkingSpaceHelper,
  ParkingIcon,
  ArrowsWrapper,
  CarWrapper,
  Car,
  PreviewCar,
  YouAreParkedButton,
} from './styles';

import car from '../../../resources/car_1.png';
import Arrows from '../../Arrows';

import { usePreview } from 'react-dnd-preview';
import { useDrag, useDrop } from 'react-dnd';

const Landing = () => {
  const { data: sessionStatus, isLoading: isSessionStatusLoading } = useGetData(
      { url: `/registriranParkirac/session` } 
  );

  const history = useHistory();
  const { display, itemType, item, style } = usePreview();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'img',
    item: 'Car',
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        history.push('/session');
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'img',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const CarPreview =() => {
    if (!display) {
      return null;
    }
    return <Car className='car-preview' src={car} style={style} />;
  };
  return (
      <Wrapper>
          <ParkingSpace
              ref={drop}
              style={{ backgroundColor: canDrop ? 'rgba(0,255,0,0.3)' : '' }}
          >
              <ParkingSpaceHelper style={{ bottom: 0, left: '-12.5%' }} />
              <ParkingSpaceHelper style={{ bottom: 0, right: '-12.5%' }} />
              {sessionStatus ? (
                  <Car
                      src={car}
                      style={{
                          transform: 'translateX(-50%)',
                          width: '70.5%',
                          left: '50%',
                      }}
                  />
              ) : (
                  <ParkingIcon />
              )}
          </ParkingSpace>
          {sessionStatus ? null : (
              <ArrowsWrapper>
                  <Arrows />
              </ArrowsWrapper>
          )}
          {isDragging || sessionStatus ? null : <Car src={car} ref={drag} />}
          {!sessionStatus ? null : (
              <YouAreParkedButton onClick={() => history.push('/session')}>
                  Паркирани Сте
              </YouAreParkedButton>
          )}
          <CarPreview />
      </Wrapper>
  );
};

export default Landing;
