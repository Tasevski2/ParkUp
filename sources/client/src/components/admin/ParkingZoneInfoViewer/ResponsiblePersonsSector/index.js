import {
  Wrapper,
  Title,
  DividerUnderTitle,
  TableWrapper,
  Elipsis,
} from './styles';

const ResponsiblePersonsSector = ({ persons }) => {
  return (
    <Wrapper>
      <Title>Одговорни Лица</Title>
      <DividerUnderTitle />
      <TableWrapper>
        <table>
          <thead>
            <tr>
              <th>Име</th>
              <th>Презиме</th>
              <th>Повеќе</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((person, index) => {
              return (
                  <tr key={index}>
                      <td>{person.firstName}</td>
                      <td>{person.lastName}</td>
                      <td>
                          <Elipsis
                              target='_blank'
                              to={`/employees/${person.workerId}`}
                          >
                              ...
                          </Elipsis>
                      </td>
                  </tr>
              );
            })}
          </tbody>
        </table>
      </TableWrapper>
    </Wrapper>
  );
};

export default ResponsiblePersonsSector;
