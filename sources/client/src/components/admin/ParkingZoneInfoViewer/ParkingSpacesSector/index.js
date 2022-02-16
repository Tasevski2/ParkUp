import {
  Wrapper,
  Title,
  DividerUnderTitle,
  ParkingSpacesNumberWrapper,
  NumberLabel,
  NumberValue,
  TableWrapper,
} from './styles';

const ParkingSpacesSector = ({
  parkingSpacesLocation = [],
}) => {
  return (
      <Wrapper>
          <Title>Паркинг Места</Title>
          <DividerUnderTitle />
          <ParkingSpacesNumberWrapper>
              <NumberLabel>Вкупно паркинг места:</NumberLabel>
              <NumberValue>{parkingSpacesLocation?.length ?? 0}</NumberValue>
          </ParkingSpacesNumberWrapper>
          <TableWrapper>
              <table>
                  <thead>
                      <tr>
                          <th>Латитуда</th>
                          <th>Лонгитуда</th>
                          <th>Број</th>
                      </tr>
                  </thead>
                  <tbody>
                      {parkingSpacesLocation &&
                          parkingSpacesLocation.map(
                              ({ lat, lng, psName }, index) => (
                                  <tr key={index}>
                                      <td>{lat}</td>
                                      <td>{lng}</td>
                                      <td>{psName}</td>
                                  </tr>
                              )
                          )}
                  </tbody>
              </table>
          </TableWrapper>
      </Wrapper>
  );
};

export default ParkingSpacesSector;
