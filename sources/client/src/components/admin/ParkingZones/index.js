import { useState, useContext } from 'react';
import {
    FiltersWrapper,
    SortingArrowsWrapper,
    SortByTitle,
    ArrowDown,
    ArrowUp,
    ClearSortIcon,
    ParkingZonesWrapper,
    AddParkingZoneCard,
    AddIcon,
    AddItem,
    ParkingName,
    DividerUnderFilters,
    ModalContainer,
    ModalTitle,
    ModalInputAndLabelWrapper,
    ModalInput,
    ModalInputLabel,
    ModalButton,
    ButtonWrapper,
    CloseIcon,
} from './styles';

import AbsoluteLoader from '../../Loaders/AbsoluteLoader';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import { IconButton, Slide } from '@mui/material';
import ParkingZoneCard from './ParkingZoneCard';

import { roles } from '../../../config/enums';
import { UserContext } from '../../../context/UserContext';
import useGetData from '../../../hooks/useGetData';
import useCreateZone from '../../../hooks/useCreateZone';

import { parkingZones } from './mockData';

const sortDownUp = (a, b) => {
    const aPercent = a.takenParkingSpaces / a.parkingSpacesNumber;
    const bPercent = b.takenParkingSpaces / b.parkingSpacesNumber;
    if (aPercent > bPercent) {
        return 1;
    } else {
        if (aPercent < bPercent) {
            return -1;
        }
        return a.zoneName - b.zoneName;
    }
};

const sortUpDown = (a, b) => {
    const aPercent = a.takenParkingSpaces / a.parkingSpacesNumber;
    const bPercent = b.takenParkingSpaces / b.parkingSpacesNumber;
    if (aPercent > bPercent) {
        return -1;
    } else {
        if (aPercent < bPercent) {
            return 1;
        }
        return a.zoneName - b.zoneName;
    }
};

const sortByName = (a, b) => {
    if (a.zoneName >= b.zoneName) {
        return 1;
    }
    return -1;
};

const ParkingZones = () => {
    const { user } = useContext(UserContext);
    const {
        data: zones,
        setData: setZones,
        isLoading: isLoadingZones,
    } = useGetData({
        url: '/parkingZone',
    });
    const { createZone, isLoading: isCreateZoneLoading } = useCreateZone();
    const [isArrowUpUp, setIsArrowUpUp] = useState(false);
    const [isArrowDownUp, setIsArrowDownUp] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalInput, setModalInput] = useState('');
    const sortFunc = isArrowUpUp
        ? sortDownUp
        : isArrowDownUp
        ? sortUpDown
        : sortByName;

    const addNewZoneToData = (newZone) => {
        setZones([...zones, newZone]);
    };
    const handleCreateZone = () => {
        createZone({
            zoneName: modalInput,
            setModalInput,
            setModalOpen,
            addNewZoneToData,
        });
    };

    return (
        <>
            <Modal
                open={isModalOpen}
                onClose={() => {
                    setModalInput('');
                    setModalOpen(false);
                }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Slide in={isModalOpen}>
                    <ModalContainer>
                        <IconButton
                            style={{
                                marginLeft: 345,
                            }}
                            onClick={() => {
                                setModalInput('');
                                setModalOpen(false);
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        {isCreateZoneLoading ? (
                            <AbsoluteLoader
                                containerStyle={{
                                    width: '200px',
                                    height: '200px',
                                    margin: 'auto',
                                    marginTop: '30px',
                                }}
                            />
                        ) : (
                            <>
                                <ModalTitle>НОВА ЗОНА</ModalTitle>
                                <ModalInputAndLabelWrapper>
                                    <ModalInputLabel>
                                        Назив на Зона
                                    </ModalInputLabel>
                                    <ModalInput
                                        value={modalInput}
                                        onChange={(event) =>
                                            setModalInput(event.target.value)
                                        }
                                    />
                                </ModalInputAndLabelWrapper>
                                <ButtonWrapper>
                                    <ModalButton onClick={handleCreateZone}>
                                        Креирај Зона
                                    </ModalButton>
                                </ButtonWrapper>
                            </>
                        )}
                    </ModalContainer>
                </Slide>
            </Modal>
            <FiltersWrapper>
                <ParkingName>Паркинг - Дебар Маало</ParkingName>
                <SortingArrowsWrapper>
                    <SortByTitle>Сортирај:</SortByTitle>
                    <ArrowUp
                        onClick={() => {
                            if (!isArrowUpUp) {
                                setIsArrowUpUp(true);
                                setIsArrowDownUp(false);
                            }
                        }}
                        selected={isArrowUpUp}
                    />
                    <ArrowDown
                        onClick={() => {
                            if (!isArrowDownUp) {
                                setIsArrowDownUp(true);
                                setIsArrowUpUp(false);
                            }
                        }}
                        selected={isArrowDownUp}
                    />
                    {isArrowUpUp || isArrowDownUp ? (
                        <ClearSortIcon
                            onClick={() => {
                                setIsArrowUpUp(false);
                                setIsArrowDownUp(false);
                            }}
                        />
                    ) : null}
                </SortingArrowsWrapper>
            </FiltersWrapper>

            <DividerUnderFilters />

            <ParkingZonesWrapper container spacing={{ xs: 3, md: 5 }}>
                {isLoadingZones ? (
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
                        {user.role === roles.admin ? (
                            <AddParkingZoneCard
                                item
                                xs={11}
                                sm={6}
                                md={3}
                                onClick={() => setModalOpen(true)}
                            >
                                <AddItem>
                                    <AddIcon />
                                </AddItem>
                            </AddParkingZoneCard>
                        ) : null}

                        {zones.sort(sortFunc).map((parkingZone) => (
                            <ParkingZoneCard
                                key={parkingZone.id}
                                info={parkingZone}
                            />
                        ))}
                    </>
                )}
            </ParkingZonesWrapper>
        </>
    );
};

export default ParkingZones;
