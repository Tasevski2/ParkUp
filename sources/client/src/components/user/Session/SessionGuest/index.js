import { useContext, useEffect } from 'react';
import {
    SessionInfo,
    Input,
    PersonIcon,
    PhoneIcon,
    PlateAndZoneWrapper,
    ZoneSelectInput,
    DropdownItem,
} from './styles';

import { sessionStatus as enumsSessionStatus } from '../../../../config/enums';
import useGetData from '../../../../hooks/useGetData';
import { UserContext } from '../../../../context/UserContext';

const MenuProps = {
    PaperProps: {
        style: {
            height: 150,
            width: '35px',
        },
    },
};

const SessionGuest = ({
    sessionStatus,
    sessionInfo,
    zones,
    data,
    onFormChange,
    setNewData,
}) => {
    const { user } = useContext(UserContext);
    const { data: guest, isLoading: isGuestLoading } = useGetData({
        url: `/guest/${user.id}`,
    });

    useEffect(() => {
        if (!guest) return;
        setNewData({ plate: guest.plate.plate, zone: data.zone });
    }, [guest]);
    console.log(sessionStatus);
    return (
        !isGuestLoading && <SessionInfo>
            <Input
                disabled
                name='mobile'
                placeholder='Телефонски број'
                value={guest.mobile}
                InputProps={{
                    startAdornment: <PhoneIcon />,
                }}
            />
            <Input
                disabled
                name='email'
                placeholder='Емаил адреса'
                value={guest.email}
                InputProps={{
                    startAdornment: <PersonIcon />,
                }}
            />
            <PlateAndZoneWrapper>
                <Input
                    disabled
                    name='plate'
                    placeholder='Таблица...'
                    style={{
                        width: '49%',
                        textAlign: 'center',
                    }}
                    value={guest.plate.plate}
                />
                <ZoneSelectInput
                    MenuProps={MenuProps}
                    name='zone'
                    onChange={onFormChange}
                    value={data.zone}
                    inputProps={{
                        readOnly:
                            sessionStatus !== null
                                
                    }}
                    $show={sessionStatus === null}
                >
                    <DropdownItem value='NONE'>
                        <em>NONE</em>
                    </DropdownItem>
                    {zones.map((z, ind) => (
                        <DropdownItem key={ind} value={z}>
                            {z}
                        </DropdownItem>
                    ))}
                </ZoneSelectInput>
            </PlateAndZoneWrapper>
        </SessionInfo>
    );
};

export default SessionGuest;
