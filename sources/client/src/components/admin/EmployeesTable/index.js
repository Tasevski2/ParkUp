import { useEffect } from 'react';
import { useHistory } from 'react-router';

import {
    TableContainer,
    TableHeaderWrapper,
    TableTitle,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    ButtonTableCell,
    ToggleAccoutStatusButton,
    CreateEmployeeButton,
    AddIcon,
    SearchField,
    IdentityIcon,
} from './styles';

import InputAdornment from '@mui/material/InputAdornment';
import DropdownViewer from '../../DropdownViewer';

import { employeeStatus, accountStatus } from '../../../config/enums';
import useGetData from '../../../hooks/useGetData';
import useToggleAccountStatus from '../../../hooks/useToggleAccountStatus';
import AbsoluteLoader from '../../Loaders/AbsoluteLoader';

// import { employees } from './mockData';
import { useState } from 'react';

const EmployeesTable = () => {
    let history = useHistory();
    const { toggleAccountStatus, isLoading: isLoadingAccountStatus } =
        useToggleAccountStatus();
    const { data: employees, isLoading: isLoadingEmployees } = useGetData({
        url: `/vraboten`,
    });
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [search, setSearch] = useState('');
    const onRowClick = (workerId) => {
        history.push(`/employees/${workerId}`);
    };
    const changeAccoutStatusOnEmployee = ({ workerId }) => {
        const emp = filteredEmployees.find((e) => e.workerId === workerId);
        emp.accountNonLocked = !emp.accountNonLocked;
    };
    const onAccountStatusClick = (event, workerId) => {
        event.stopPropagation();
        toggleAccountStatus({ workerId, changeAccoutStatusOnEmployee });
    };

    const onChangeSearch = (e) => {
        let newSearchValue = e.target.value;
        setSearch(newSearchValue);
        const filteredData = employees.filter((employee) =>
            employee.firstName
                .concat(` ${employee.lastName}`)
                .toLowerCase()
                .includes(newSearchValue.trim().toLowerCase())
        );

        setFilteredEmployees(filteredData);
    };

    useEffect(() => {
        setFilteredEmployees(employees);
    }, [employees]);

    return (
        !isLoadingEmployees && (
            <TableContainer>
                <TableHeaderWrapper>
                    {isLoadingAccountStatus ? (
                        <AbsoluteLoader
                            containerStyle={{
                                position: 'absolute',
                                left: '65%',
                                width: '42px',
                                height: '42px',
                            }}
                        />
                    ) : null}
                    <TableTitle variant='h5'>Вработени</TableTitle>
                    <SearchField
                        value={search}
                        onChange={(e) => onChangeSearch(e)}
                        placeholder='Пребарај...'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <IdentityIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <CreateEmployeeButton
                        onClick={() => history.push('/employees/create')}
                    >
                        <AddIcon />
                        Додади вработен
                    </CreateEmployeeButton>
                </TableHeaderWrapper>
                <Table aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>Емаил</TableCell>
                            <TableCell align='center'>Име и Презиме</TableCell>
                            <TableCell align='center'>Зона</TableCell>
                            <TableCell align='center'>Телефон</TableCell>
                            <TableCell align='center'>Статус</TableCell>
                            <TableCell align='center'>Акаунт</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredEmployees.map((employeeData) => (
                            <TableRow
                                key={employeeData.workerId}
                                onClick={() =>
                                    onRowClick(employeeData.workerId)
                                }
                            >
                                <TableCell align='left'>
                                    {employeeData.email}
                                </TableCell>
                                <TableCell align='center'>
                                    {employeeData.firstName}{' '}
                                    {employeeData.lastName}
                                </TableCell>
                                <TableCell
                                    align='center'
                                    style={{ padding: 0, width: '200px' }}
                                >
                                    <DropdownViewer
                                        data={employeeData.parkingZones.map(
                                            (z) => z.pzName
                                        )} // TODO DELETE - after backend fix
                                        width='200px'
                                    />
                                </TableCell>
                                <TableCell align='center'>
                                    {employeeData.mobile}
                                </TableCell>
                                <TableCell align='center'>
                                    {employeeStatus[employeeData.status]}
                                </TableCell>
                                <ButtonTableCell align='center'>
                                    <ToggleAccoutStatusButton
                                        onClick={(event) =>
                                            onAccountStatusClick(
                                                event,
                                                employeeData.workerId
                                            )
                                        }
                                        $enabled={employeeData.accountNonLocked}
                                    >
                                        {/* $ added because https://styled-components.com/docs/api#transient-props*/}
                                        {employeeData.accountNonLocked
                                            ? accountStatus.enabled
                                            : accountStatus.disabled}
                                    </ToggleAccoutStatusButton>
                                </ButtonTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    );
};

export default EmployeesTable;
