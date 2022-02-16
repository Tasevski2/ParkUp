import { RightSideWrapper, EditIcon } from './styles';

import ZoneSector from './ZoneSector';
import ResponsiblePersonsSector from './ResponsiblePersonsSector';
import ParkingSpacesSector from './ParkingSpacesSector';
import { IconButton } from '@mui/material';

const ParkingZoneInfoViewer = ({ zone = {}, setEditMode }) => {
  return (
      <>
          <ZoneSector
              name={zone?.pzName ?? null}
              hourlyRate={zone?.price ?? null}
              from={zone?.from ?? 0}
              to={zone?.to ?? 0}
              color={zone?.color ?? ''}
              centerLocation={zone?.parkingZoneLocation?.centre ?? null}
              coords={zone?.parkingZoneLocation?.coords ?? null}
          />
          <RightSideWrapper>
              <IconButton
                  style={{
                      position: 'absolute',
                      top: -60,
                      right: -8,
                  }}
                  onClick={() => setEditMode(true)}
              >
                  <EditIcon />
              </IconButton>
              <ResponsiblePersonsSector
                  persons={zone?.responsibleWorkers ?? []}
              />
              <ParkingSpacesSector
                  parkingSpacesLocation={zone?.parkingSpaces ?? null}
              />
          </RightSideWrapper>
      </>
  );
};

export default ParkingZoneInfoViewer;
