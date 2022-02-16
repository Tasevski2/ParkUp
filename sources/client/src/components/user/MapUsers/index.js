import { useEffect, useState } from 'react';

import {
    Wrapper,
    GoogleMapsWrapper,
    ZoneSelectInput,
    DropdownItem,
    ZoneInfoWrapper,
    KeyValueWrapper,
    Key,
    Value,
    FreeParkingSpacesText,
} from './styles';

import GoogleMaps from '../../GoogleMaps';
import useGetData from '../../../hooks/useGetData';
import useGetZoneByName from '../../../hooks/useGetZoneByName';

const mockParkingSpaces = [
    {
        zone: 'Zona 1',
        lat: '42.00043725326595',
        lng: '21.42263398879119',
        psName: 'A33',
        taken: true,
    },
    {
        zone: 'Zona 1',
        lat: '42.00028576562848',
        lng: '21.423680050318325',
        psName: 'A34',
        taken: false,
    },
    {
        zone: 'Zona 1',
        lat: '41.99959609366812',
        lng: '21.423374278487316',
        psName: 'A35',
        taken: false,
    },
    {
        zone: 'Zona 1',
        lat: '41.99962798617793',
        lng: '21.42275200598912',
        psName: 'A36',
        taken: true,
    },
    {
        zone: 'Zona 2',
        lat: '42.00075019371071',
        lng: '21.42124996894335',
        psName: 'B33',
        taken: true,
    },
    {
        zone: 'Zona 2',
        lat: '42.00070634227895',
        lng: '21.421571834028622',
        psName: 'B34',
        taken: false,
    },
    {
        zone: 'Zona 2',
        lat: '42.00092958561692',
        lng: '21.421579880655756',
        psName: 'B35',
        taken: false,
    },
    {
        zone: 'Zona 2',
        lat: '42.00115083493807',
        lng: '21.421402854858854',
        psName: 'B36',
        isTaken: true,
    },
];

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 150,
            width: '35px',
        },
    },
};

const defaultZoneInfo = {
    parkingZoneLocation: {
        coords: [],
        centre: {
            lat: 42.00120992770302,
            lng: 21.42053372084796,
        },
    },
    color: '',
};

const MapUsers = () => {
    const {data: fetchedParkingSpaces, isLoadingParkingSpaces} = useGetData({url: '/parkingSpace'}); 
    const { data: fetchedSelectZones, isLoading: isLoadingSelectZones } =
        useGetData({ url: '/parkingZone/parkingZoneNames' });
    const {
        zone: zoneInfo,
        isLoading: isLoadingZoneInfo,
        fetchZone,
        setZone: setZoneInfo,
    } = useGetZoneByName(defaultZoneInfo);

    const [selectedZone, setSelectedZone] = useState('NONE');
    // const [zoneInfo, setZoneInfo] = useState({ ...defaultZoneInfo });
    const [parkingSpaces, setParkingSpaces] = useState([]);
    const [freeParkingSpaces, setFreeParkingSpaces] = useState(0);
    const handleSelectZone = async (e) => {
        const _selectedZone = e.target.value;
        let zone;
        let _parkingSpaces;
        let _freeParkingSpaces;
        if (_selectedZone === 'NONE') {
            zone = { ...defaultZoneInfo };
            _parkingSpaces = [...fetchedParkingSpaces ?? []];
            _freeParkingSpaces =
                _parkingSpaces.filter((p) => !p.taken).length;
        setZoneInfo(zone);
        } else {
            zone = await fetchZone(_selectedZone);
            _parkingSpaces = zone.parkingSpaces;
            _freeParkingSpaces = _parkingSpaces.filter(
                (p) => !p.taken
            ).length;
        }
        setParkingSpaces(_parkingSpaces);
        setFreeParkingSpaces(_freeParkingSpaces);
        setSelectedZone(_selectedZone);
    };

    useEffect(() => {
        setParkingSpaces(fetchedParkingSpaces ?? []);
        fetchedParkingSpaces &&
            setFreeParkingSpaces(
                fetchedParkingSpaces.filter((p) => !p.taken).length
            );
    }, [fetchedParkingSpaces])

    return (
        <Wrapper>
            <FreeParkingSpacesText>
                Слободни места: {freeParkingSpaces}
            </FreeParkingSpacesText>
            <GoogleMapsWrapper>
                <GoogleMaps
                    location={zoneInfo.parkingZoneLocation}
                    parkingSpaces={parkingSpaces}
                    zoneAreaColor={zoneInfo.color}
                    zoom={selectedZone === 'NONE' ? 15 : 16}
                />
            </GoogleMapsWrapper>
            <ZoneSelectInput
                MenuProps={MenuProps}
                name='zone'
                onChange={handleSelectZone}
                value={selectedZone}
            >
                <DropdownItem value='NONE'>
                    <em>NONE</em>
                </DropdownItem>
                {fetchedSelectZones &&
                    fetchedSelectZones.map((z, ind) => (
                        <DropdownItem key={ind} value={z}>
                            {z}
                        </DropdownItem>
                    ))}
            </ZoneSelectInput>
            {selectedZone !== 'NONE' ? (
                <ZoneInfoWrapper>
                    <KeyValueWrapper>
                        <Key>Цена(час):</Key>
                        <Value>{zoneInfo.price ?? ''} ден.</Value>
                    </KeyValueWrapper>
                    <KeyValueWrapper>
                        <Key>Работни часови:</Key>
                        <Value>
                            {zoneInfo?.from ?? ''} - {zoneInfo?.to ?? ''}
                        </Value>
                    </KeyValueWrapper>
                </ZoneInfoWrapper>
            ) : null}
        </Wrapper>
    );
};

export default MapUsers;
