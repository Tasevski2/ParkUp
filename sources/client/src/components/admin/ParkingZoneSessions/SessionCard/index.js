import { useState } from 'react';
import moment from 'moment';

import {
    Wrapper,
    SessionChildWrapper,
    SessionChildTitle,
    SeessionChildData,
    InputAndCheckIconWrapper,
    ParkingSpaceNumberInput,
    CheckIcon,
    DeleteButton,
} from './styles';

import { sessionStatus } from '../../../../config/enums';
import { dateFormatString } from '../../../../config/utilities';
import { IconButton } from '@mui/material';
import AbsoluteLoader from '../../../Loaders/AbsoluteLoader';
import useDeleteSession from '../../../../hooks/useDeleteSession';


const sessionCardColors = {
    active: '#389e0d',
    idle: '#ffa940',
    over: '#cf1322',
};

const ActiveCard = ({
    pssId,
    timeStart,
    zone,
    plate,
    status,
    parkingSpace,
    onDeleteSession,
}) => {
    const { isLoading: isLoadingDeleteSession, deleteSession } =
        useDeleteSession();
    const formatedTimeStart = moment(timeStart).format(dateFormatString);
    return (
        <Wrapper style={{ backgroundColor: sessionCardColors.active }}>
            <SessionChildWrapper>
                <SessionChildTitle>Почеток</SessionChildTitle>
                <SeessionChildData>{formatedTimeStart}</SeessionChildData>
            </SessionChildWrapper>

            <SessionChildWrapper>
                <SessionChildTitle>Број на место</SessionChildTitle>
                <SeessionChildData>{parkingSpace.psName}</SeessionChildData>
            </SessionChildWrapper>

            <SessionChildWrapper>
                <SessionChildTitle>Регистрација</SessionChildTitle>
                <SeessionChildData>{plate.plate}</SeessionChildData>
            </SessionChildWrapper>

            <SessionChildWrapper>
                {isLoadingDeleteSession ? (
                    <div style={{ width: '104px', textAlign: 'center' }}>
                        <AbsoluteLoader
                            containerStyle={{
                                width: '40px',
                                height: '40px',
                                display: 'inline-block',
                            }}
                        />
                    </div>
                ) : (
                    <DeleteButton
                        onClick={() => {
                            console.log(`CLICKED DELETE BUTTON ${pssId}`);
                            deleteSession({ pssId, onDeleteSession });
                        }}
                    >
                        ИЗБРИШИ
                    </DeleteButton>
                )}
            </SessionChildWrapper>
        </Wrapper>
    );
};

const IdleCard = ({
    pssId,
    timeStart,
    zone,
    plate,
    status,
    handleActivateSession,
    isLoadingActivateSession,
    onDeleteSession,
}) => {
    const { isLoading: isLoadingDeleteSession, deleteSession } =
        useDeleteSession();
    const [parkingSpaceName, setParkingSpaceName] = useState('');
    const formatedTimeStart = moment(timeStart).format(dateFormatString);
    return (
        <Wrapper style={{ backgroundColor: sessionCardColors.idle }}>
            <SessionChildWrapper>
                <SessionChildTitle>Почеток</SessionChildTitle>
                <SeessionChildData>{formatedTimeStart}</SeessionChildData>
            </SessionChildWrapper>

            <SessionChildWrapper>
                <SessionChildTitle>Број на место</SessionChildTitle>
                <InputAndCheckIconWrapper>
                    <ParkingSpaceNumberInput
                        value={parkingSpaceName}
                        onChange={(event) =>
                            setParkingSpaceName(event.target.value.trim())
                        }
                    />
                    {parkingSpaceName !== '' ? (
                        <>
                            {isLoadingActivateSession ? (
                                <AbsoluteLoader
                                    containerStyle={{
                                        width: '2rem',
                                        height: '2rem',
                                        display: 'inline-block',
                                    }}
                                />
                            ) : (
                                <IconButton
                                    onClick={() =>
                                        handleActivateSession({
                                            pssId,
                                            parkingSpaceName,
                                        })
                                    }
                                >
                                    <CheckIcon />
                                </IconButton>
                            )}
                        </>
                    ) : null}
                </InputAndCheckIconWrapper>
            </SessionChildWrapper>

            <SessionChildWrapper>
                <SessionChildTitle>Регистрација</SessionChildTitle>
                <SeessionChildData>{plate.plate}</SeessionChildData>
            </SessionChildWrapper>

            <SessionChildWrapper>
                {isLoadingDeleteSession ? (
                    <div style={{ width: '104px', textAlign: 'center' }}>
                        <AbsoluteLoader
                            containerStyle={{
                                width: '40px',
                                height: '40px',
                                display: 'inline-block',
                            }}
                        />
                    </div>
                ) : (
                    <DeleteButton
                        onClick={() => {
                            console.log(`CLICKED DELETE BUTTON ${pssId}`);
                            deleteSession({ pssId, onDeleteSession });
                        }}
                    >
                        ИЗБРИШИ
                    </DeleteButton>
                )}
            </SessionChildWrapper>
        </Wrapper>
    );
};

const OverCard = ({
    pssId,
    timeStart,
    timeEnd,
    zone,
    plate,
    status,
    parkingSpace,
    onDeleteSession,
}) => {
    const { isLoading: isLoadingDeleteSession, deleteSession } =
        useDeleteSession();
    const formatedTimeStart = moment(timeStart).format(dateFormatString);
    const formatedTimeEnd = moment(timeEnd).format(dateFormatString);
    return (
        <Wrapper style={{ backgroundColor: sessionCardColors.over }}>
            <SessionChildWrapper>
                <SessionChildWrapper style={{ margin: 0 }}>
                    <SessionChildTitle>Почеток</SessionChildTitle>
                    <SeessionChildData>{formatedTimeStart}</SeessionChildData>
                </SessionChildWrapper>
                <SessionChildWrapper style={{ marginTop: '5px' }}>
                    <SessionChildTitle>Крај</SessionChildTitle>
                    <SeessionChildData>{formatedTimeEnd}</SeessionChildData>
                </SessionChildWrapper>
            </SessionChildWrapper>

            <SessionChildWrapper>
                <SessionChildTitle>Број на место</SessionChildTitle>
                <SeessionChildData>{parkingSpace.psName}</SeessionChildData>
            </SessionChildWrapper>

            <SessionChildWrapper>
                <SessionChildTitle>Регистрација</SessionChildTitle>
                <SeessionChildData>{plate.plate}</SeessionChildData>
            </SessionChildWrapper>

            <SessionChildWrapper>
                {isLoadingDeleteSession ? (
                    <div style={{ width: '104px', textAlign: 'center' }}>
                        <AbsoluteLoader
                            containerStyle={{
                                width: '40px',
                                height: '40px',
                                display: 'inline-block',
                            }}
                        />
                    </div>
                ) : (
                    <DeleteButton
                        onClick={() => {
                            console.log(`CLICKED DELETE BUTTON ${pssId}`);
                            deleteSession({ pssId, onDeleteSession });
                        }}
                    >
                        ИЗБРИШИ
                    </DeleteButton>
                )}
            </SessionChildWrapper>
        </Wrapper>
    );
};

const SessionCard = ({
    handleActivateSession,
    isLoadingActivateSession,
    ...commponProps
}) => {
    switch (commponProps.status) {
        case sessionStatus.active:
            return <ActiveCard {...commponProps} />;
        case sessionStatus.idle:
            return (
                <IdleCard
                    {...commponProps}
                    handleActivateSession={handleActivateSession}
                    isLoadingActivateSession={isLoadingActivateSession}
                />
            );
        case sessionStatus.over:
            return <OverCard {...commponProps} />;
        default:
            return null;
    }
};

export default SessionCard;
