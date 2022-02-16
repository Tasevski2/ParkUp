import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useForm from '../../../hooks/useForm';

import {
    EmployeeEditWrapper,
    Title,
    RowWrapper,
    LabelAndInputWrapper,
    Label,
    StandardInputField,
    Dropdown,
    DropdownOption,
    SwitchRowWrapper,
    SwitchTitle,
    SwitchLabelAndInputWrapper,
    AccountSwitch,
    BackButton,
    SaveChangesButton,
    VisibilityIcon,
    VisibilityOffIcon,
} from './styles';

import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import AbsoluteLoader from '../../Loaders/AbsoluteLoader';

import { employeeStatus } from '../../../config/enums';
import useGetData from '../../../hooks/useGetData';
import useCreateEmployee from '../../../hooks/useCreateEmployee';

import { defaultUser } from '../../../config/defaultUser';

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 220,
        },
    },
};

const EmployeeCreate = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    let history = useHistory();
    const { data: zoneOptions, isLoading: isLoadingZonesData } = useGetData({
        url: `/parkingZone/parkingZoneNames`,
    });
    const { createEmployee } = useCreateEmployee();
    const {
        data: employeeEditableData,
        onFormChange: setEmployeeEditableData,
    } = useForm({ ...defaultUser });
    const [accStatus, setAccStatus] = useState(defaultUser.locked);
    const {
        data: { confirmPassword },
        onFormChange: setConfirmPassword,
    } = useForm({
        confirmPassword: defaultUser.password,
    });
    const [zones, setZones] = useState(defaultUser.parkingZones); // TODO RENAME ZONE TO ZONES
    console.log(zones);
    const statusOptions = Object.keys(employeeStatus).map((key) => {
        return {
            text: employeeStatus[key],
            value: key,
        };
    });

    const onCreateEmployee = () => {
        if (zones.length === 1 && zones[0] === 'NONE') {
            zones.shift();
        }
        console.log(`Confirm password: ${confirmPassword}`);
        const changedEmployee = {
            ...employeeEditableData,
            locked: accStatus,
            parkingZones: zones,
            confirmPass: confirmPassword,
        };
        createEmployee({ employee: changedEmployee });
    };
    const handleZonesChange = (event) => {
        const {
            target: { value },
        } = event;
        if (value.length > 1 && value[0] === 'NONE') {
            value.shift();
        }
        setZones(
            typeof value === 'string'
                ? value.split(', ')
                : value.length === 0
                ? ['NONE']
                : value
        );
    };
    return (
        <EmployeeEditWrapper>
            <Title variant='h5'>Создади вработен</Title>
            <RowWrapper>
                <LabelAndInputWrapper>
                    <Label>Име</Label>
                    <StandardInputField
                        value={employeeEditableData.firstName}
                        name='firstName'
                        onChange={setEmployeeEditableData}
                    />
                </LabelAndInputWrapper>
                <LabelAndInputWrapper>
                    <Label>Презиме</Label>
                    <StandardInputField
                        value={employeeEditableData.lastName}
                        name='lastName'
                        onChange={setEmployeeEditableData}
                    />
                </LabelAndInputWrapper>
            </RowWrapper>
            <RowWrapper>
                <LabelAndInputWrapper>
                    <Label>Емаил</Label>
                    <StandardInputField
                        value={employeeEditableData.email}
                        name='email'
                        type='email'
                        onChange={setEmployeeEditableData}
                    />
                </LabelAndInputWrapper>
                <LabelAndInputWrapper>
                    <Label>Телефон</Label>
                    <StandardInputField
                        value={employeeEditableData.mobile}
                        name='mobile'
                        onChange={setEmployeeEditableData}
                    />
                </LabelAndInputWrapper>
            </RowWrapper>
            <RowWrapper>
                <LabelAndInputWrapper>
                    <Label>Лозинка</Label>
                    <StandardInputField
                        value={employeeEditableData.password}
                        name='password'
                        type={isPasswordVisible ? 'text' : 'password'}
                        $autoComplete={true}
                        onChange={setEmployeeEditableData}
                    />
                </LabelAndInputWrapper>
                <IconButton
                    sx={{ marginTop: '23px' }}
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                    {isPasswordVisible ? (
                        <VisibilityIcon />
                    ) : (
                        <VisibilityOffIcon />
                    )}
                </IconButton>
                <LabelAndInputWrapper>
                    <Label>Потврди лозинка</Label>
                    <StandardInputField
                        value={confirmPassword}
                        name='confirmPassword'
                        type={isPasswordVisible ? 'text' : 'password'}
                        onChange={setConfirmPassword}
                    />
                </LabelAndInputWrapper>
            </RowWrapper>
            <RowWrapper>
                {isLoadingZonesData ? (
                    <AbsoluteLoader
                        containerStyle={{
                            position: 'absolute',
                            left: '310px',
                            bottom: '5px',
                            width: '40px',
                            height: '40px',
                        }}
                    />
                ) : null}
                <LabelAndInputWrapper>
                    <Label>Одговорен за</Label>
                    <Dropdown
                        multiple
                        value={zones}
                        onChange={handleZonesChange}
                        renderValue={(selected) => {
                            return selected.join(', ');
                        }}
                        MenuProps={MenuProps}
                    >
                        {!isLoadingZonesData &&
                            zoneOptions.map((zone) => (
                                <DropdownOption value={zone} key={zone}>
                                    <Checkbox
                                        checked={zones.indexOf(zone) > -1}
                                    />
                                    <ListItemText primary={zone} />
                                </DropdownOption>
                            ))}
                    </Dropdown>
                </LabelAndInputWrapper>
                <LabelAndInputWrapper>
                    <Label>Статус</Label>
                    <Dropdown
                        value={employeeEditableData.status}
                        name='status'
                        onChange={setEmployeeEditableData}
                        MenuProps={MenuProps}
                    >
                        {statusOptions.map((option) => (
                            <DropdownOption
                                value={option.value}
                                key={option.value}
                            >
                                {option.text}
                            </DropdownOption>
                        ))}
                    </Dropdown>
                </LabelAndInputWrapper>
            </RowWrapper>
            <SwitchRowWrapper>
                <SwitchTitle>Акаунт</SwitchTitle>
                <SwitchLabelAndInputWrapper>
                    <Label>Активен:</Label>
                    <AccountSwitch
                        checked={!accStatus}
                        value={accStatus}
                        name='locked'
                        onClick={() => setAccStatus(!accStatus)}
                    />
                </SwitchLabelAndInputWrapper>
            </SwitchRowWrapper>
            <RowWrapper>
                <BackButton onClick={() => history.push('/employees')}>
                    Врати се назад
                </BackButton>
                <SaveChangesButton onClick={onCreateEmployee}>
                    Создади вработен
                </SaveChangesButton>
            </RowWrapper>
        </EmployeeEditWrapper>
    );
};

export default EmployeeCreate;
