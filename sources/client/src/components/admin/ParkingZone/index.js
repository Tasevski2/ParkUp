import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IconButton } from '@mui/material';

import ParkingZoneInfo from '../ParkingZoneInfo';
import ParkingZoneSessions from '../ParkingZoneSessions';
import GoogleMaps from '../../GoogleMaps';
import CircularProgress from '@mui/material/CircularProgress';
import {
    NamesWrapper,
    ParkingAndZoneName,
    DividerUnderNames,
    NavigationIconsWrapper,
    MainSection,
    MapsIcon,
    ComponentIcon,
    ZoneNameLoader,
} from './styles';

import AbsoluteLoader from '../../Loaders/AbsoluteLoader';
import { roles } from '../../../config/enums';
import { UserContext } from '../../../context/UserContext';
import useGetData from '../../../hooks/useGetData';

const defaultLocationObj = {
    centre: {
        lat: 42.000629,
        lng: 21.420525,
    },
    coords: []
};

const mockResponsiblePersons = [
    // TODO DELTE THIS
    {
        id: 1,
        email: 'viktor-tasevski@hotmail.com',
        firstName: 'Viktor',
        lastName: 'Tasevski',
    },
    {
        id: 3,
        email: 'david_trajkovski@yahoo.com',
        firstName: 'David',
        lastName: 'Trajkovski',
    },
];

const activeComponentEnum = {
    MAPS: 'maps',
    INFO: 'info',
};

const ParkingZone = () => {
    const { user } = useContext(UserContext);
    const { zone_id } = useParams();
    const url = `/parkingZone/${zone_id}`;
    const { data: zoneData, isLoading: isLoadingZoneData } = useGetData({
        url: url,
    });

    const [zoneState, setZoneState] = useState(null);
    const [activeComponent, setActiveComponent] = useState(
        activeComponentEnum.MAPS
    );

    const setZone = (updatedZone) => {
        setZoneState({ ...updatedZone });
    };
    const Info =
        user.role === roles.admin ? ParkingZoneInfo : ParkingZoneSessions;

    useEffect(() => {
        setZoneState({
            ...zoneData
        });
    }, [zoneData]);
    return (
        <>
            <NamesWrapper>
                <ParkingAndZoneName>Паркинг - Дебар Маало</ParkingAndZoneName>
                <ParkingAndZoneName className='zone-name'>
                    Зона
                    {isLoadingZoneData ? (
                        <ZoneNameLoader />
                    ) : (
                        ` - ${zoneState?.pzName ?? ''}`
                    )}
                </ParkingAndZoneName>
            </NamesWrapper>

            <DividerUnderNames />

            <NavigationIconsWrapper>
                <IconButton
                    onClick={() => setActiveComponent(activeComponentEnum.MAPS)}
                >
                    <MapsIcon
                        $isactive={activeComponent === activeComponentEnum.MAPS}
                    />
                </IconButton>
                <IconButton
                    onClick={() => setActiveComponent(activeComponentEnum.INFO)}
                >
                    <ComponentIcon
                        $isactive={activeComponent === activeComponentEnum.INFO}
                    />
                </IconButton>
            </NavigationIconsWrapper>

            <MainSection>
                {isLoadingZoneData ? (
                    <AbsoluteLoader
                        containerStyle={{
                            width: '250px',
                            height: '250px',
                            margin: 'auto',
                            marginTop: '12vw',
                        }}
                    />
                ) : (
                    <>
                        {activeComponent === activeComponentEnum.MAPS ? (
                            <GoogleMaps
                                location={zoneState.parkingZoneLocation ?? defaultLocationObj}
                                parkingSpaces={zoneState.parkingSpaces}
                                zoneAreaColor={zoneState.color}
                            />
                        ) : (
                            <Info zone={zoneState} setZone={setZone} />
                        )}
                    </>
                )}
            </MainSection>
        </>
    );
};

export default ParkingZone;
