import MenuItem from '@mui/material/MenuItem';
import { ColorPicker } from 'material-ui-color';
import {
  Wrapper,
  Title,
  DividerUnderTitle,
  Characteristics,
  KeyValueWrapper,
  Key,
  Value,
  ColorCircleWrapper,
  ZoneCenterLocation,
  SmallTitle,
  LatLngCenter,
  LabelAndLatLngWrapper,
  LatLngLabel,
  LatLngValue,
  ZoneCornersLocation,
  TableWrapper,
  EditedInputAdornment,
  TimeSelectInputsWrapper,
  TimeSelectInput,
  TImeSelectInputsDivider,
  AddIcon,
  TableDataInput,
  DeleteIcon,
} from './styles';
import { IconButton } from '@mui/material';

const selectInputValues = Array(24)
  .fill()
  .map((_, index) => (
    <MenuItem value={index + 1} key={index + 1}>
      {index + 1 < 10 ? `0${index + 1}` : index + 1}
    </MenuItem>
  ));

const MenuProps = {
  PaperProps: {
    style: {
      height: 150,
      width: '35px',
    },
  },
};

const ZoneSector = ({
  zoneName,
  hourlyRate,
  from,
  to,
  zoneColor,
  setZoneColor,
  lat,
  lng,
  setZoneSectorData,
  newCoord,
  setNewCoord,
  coords,
  handleCoordsChange,
}) => {
  return (
    <Wrapper>
      <Title>Паркинг Зона</Title>
      <DividerUnderTitle />
      <Characteristics>
        <KeyValueWrapper>
          <Key>Назив:</Key>
          <Value
            name='zoneName'
            onChange={setZoneSectorData}
            value={zoneName}
          />
        </KeyValueWrapper>
        <KeyValueWrapper>
          <Key>Цена од Час:</Key>
          <Value
            name='hourlyRate'
            onChange={setZoneSectorData}
            value={hourlyRate}
            InputProps={{
              endAdornment: (
                <EditedInputAdornment style={{}} position='end'>
                  ден.
                </EditedInputAdornment>
              ),
            }}
          />
        </KeyValueWrapper>
        <KeyValueWrapper>
          <Key>Работни часови:</Key>
          <TimeSelectInputsWrapper>
            <TimeSelectInput
              MenuProps={MenuProps}
              name='from'
              onChange={setZoneSectorData}
              value={from}
            >
              <MenuItem value={0} key={0}>
                <em>NONE</em>
              </MenuItem>
              {selectInputValues}
            </TimeSelectInput>
            <TImeSelectInputsDivider />
            <TimeSelectInput
              MenuProps={MenuProps}
              name='to'
              onChange={setZoneSectorData}
              value={to}
            >
              <MenuItem value={0} key={0}>
                <em>NONE</em>
              </MenuItem>
              {selectInputValues}
            </TimeSelectInput>
          </TimeSelectInputsWrapper>
        </KeyValueWrapper>
        <KeyValueWrapper>
          <Key>Боја на зона:</Key>
          <ColorCircleWrapper>
            <ColorPicker
              value={zoneColor}
              onChange={(e) => setZoneColor(`#${e.hex}`)}
              hideTextfield
            />
          </ColorCircleWrapper>
        </KeyValueWrapper>
      </Characteristics>

      <ZoneCenterLocation>
        <SmallTitle>Центар на Зона</SmallTitle>
        <LatLngCenter>
          <LabelAndLatLngWrapper>
            <LatLngLabel htmlFor='lat-value'>Латитуда:</LatLngLabel>
            <LatLngValue
              id='lat-value'
              name='lat'
              onChange={setZoneSectorData}
              value={lat}
            />
          </LabelAndLatLngWrapper>
          <LabelAndLatLngWrapper>
            <LatLngLabel htmlFor='lng-value'>Лонгитуда:</LatLngLabel>
            <LatLngValue
              id='lng-value'
              name='lng'
              onChange={setZoneSectorData}
              value={lng}
            />
          </LabelAndLatLngWrapper>
        </LatLngCenter>
      </ZoneCenterLocation>

      <ZoneCornersLocation>
        <SmallTitle>Темиња на Зона</SmallTitle>
        <TableWrapper>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Латитуда</th>
                <th>Лонгитуда</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr className='add-row'>
                <td></td>
                <td className='add-td'>
                  <TableDataInput
                    name='newLat'
                    onChange={(e) =>
                      setNewCoord({ ...newCoord, newLat: e.target.value })
                    }
                    value={newCoord.newLat}
                  />
                </td>
                <td className='add-td'>
                  <TableDataInput
                    name='newLng'
                    onChange={(e) =>
                      setNewCoord({ ...newCoord, newLng: e.target.value })
                    }
                    value={newCoord.newLng}
                  />
                </td>
                <td>
                  <IconButton
                    style={{ padding: 3.5 }}
                    onClick={() => handleCoordsChange({ type: 'add' })}
                  >
                    <AddIcon />
                  </IconButton>
                </td>
              </tr>
              {coords.map(({ lat, lng }, index) => (
                <tr key={index}>
                  <td>
                    <IconButton
                      style={{ padding: 3.5 }}
                      onClick={() =>
                        handleCoordsChange({
                          type: 'delete',
                          payload: { index },
                        })
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                  <td>
                    <TableDataInput
                      value={lat}
                      onChange={(e) =>
                        handleCoordsChange({
                          type: 'update',
                          payload: {
                            index,
                            column: 'lat',
                            value: e.target.value,
                          },
                        })
                      }
                    />
                  </td>
                  <td>
                    <TableDataInput
                      value={lng}
                      onChange={(e) =>
                        handleCoordsChange({
                          type: 'update',
                          payload: {
                            index,
                            column: 'lng',
                            value: e.target.value,
                          },
                        })
                      }
                    />
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrapper>
      </ZoneCornersLocation>
    </Wrapper>
  );
};

export default ZoneSector;
