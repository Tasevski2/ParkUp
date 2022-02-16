import { IconButton } from '@mui/material';
import {
  Wrapper,
  Title,
  DividerUnderTitle,
  ParkingSpacesNumberWrapper,
  NumberLabel,
  NumberValue,
  TableWrapper,
  TopPartWrapper,
  AddIcon,
  DeleteIcon,
  TableDataInput,
} from './styles';

const ParkingSpacesSector = ({
    parkingSpacesNumber = 0,
  parkingSpaces = [],
  newParkingSpace = null,
  setNewParkingSpace,
  handleParkingSpacesChange,
}) => {
  return (
      <Wrapper>
          <TopPartWrapper>
              <Title>Паркинг Места</Title>
              <DividerUnderTitle />
              <ParkingSpacesNumberWrapper>
                  <NumberLabel>Вкупно паркинг места:</NumberLabel>
                  <NumberValue>{parkingSpacesNumber}</NumberValue>
              </ParkingSpacesNumberWrapper>
          </TopPartWrapper>
          <TableWrapper>
              <table>
                  <thead>
                      <tr>
                          <th></th>
                          <th>Латитуда</th>
                          <th>Лонгитуда</th>
                          <th>Број</th>
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr className='add-row'>
                          <td></td>
                          <td className='add-td'>
                              <TableDataInput
                                  value={newParkingSpace?.lat ?? ''}
                                  onChange={(e) =>
                                      setNewParkingSpace({
                                          ...newParkingSpace,
                                          lat: e.target.value,
                                      })
                                  }
                              />
                          </td>
                          <td className='add-td'>
                              <TableDataInput
                                  value={newParkingSpace?.lng ?? ''}
                                  onChange={(e) =>
                                      setNewParkingSpace({
                                          ...newParkingSpace,
                                          lng: e.target.value,
                                      })
                                  }
                              />
                          </td>
                          <td className='add-td'>
                              <TableDataInput
                                  value={newParkingSpace?.psName ?? ''}
                                  onChange={(e) =>
                                      setNewParkingSpace({
                                          ...newParkingSpace,
                                          psName: e.target.value,
                                      })
                                  }
                              />
                          </td>
                          <td>
                              <IconButton
                                  style={{ padding: 3.5 }}
                                  onClick={() =>
                                      handleParkingSpacesChange({ type: 'add' })
                                  }
                              >
                                  <AddIcon />
                              </IconButton>
                          </td>
                      </tr>
                      {parkingSpaces &&
                          parkingSpaces.map(({ lat, lng, psName }, index) => (
                              <tr key={index}>
                                  <td>
                                      <IconButton
                                          style={{ padding: 3.5 }}
                                          onClick={() =>
                                              handleParkingSpacesChange({
                                                  type: 'delete',
                                                  payload: {
                                                      index,
                                                  },
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
                                              handleParkingSpacesChange({
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
                                              handleParkingSpacesChange({
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
                                  <td>
                                      <TableDataInput
                                          value={psName}
                                          onChange={(e) =>
                                              handleParkingSpacesChange({
                                                  type: 'update',
                                                  payload: {
                                                      index,
                                                      column: 'psName',
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
      </Wrapper>
  );
};

export default ParkingSpacesSector;
