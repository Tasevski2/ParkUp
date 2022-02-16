import { useState } from 'react';
import {
    SessionInfo,
    PlateSelectInput,
    PlateAndAddPlateBtnWrapper,
    ZoneSelectInput,
    DropdownItem,
    AddIcon,
    AddPlate,
    Input,
    SavePlate,
    SaveIcon,
    PlateDropdownItem,
    RemoveIcon,
} from './styles';

import { sessionStatus as enumsSessionStatus } from '../../../../config/enums';
import useForm from '../../../../hooks/useForm';
import useSaveUserPlate from '../../../../hooks/useSaveUserPlate';
import useDeleteUserPlate from '../../../../hooks/useDeleteUserPlate';
import AbsoluteLoader from '../../../Loaders/AbsoluteLoader';
import { IconButton } from '@mui/material';
import useGetData from '../../../../hooks/useGetData';

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 150,
            width: '35px',
        },
    },
};

const SessionUser = ({
    sessionStatus,
    zones,
    data,
    onFormChange,
    setNewData,
}) => {
    const { data: plates, isLoading: isLoadingPlates, setData: setPlates } = useGetData({
        url: '/registiranParkirac/tablici',
    });
    const [newPlate, setNewPlate] = useState('');
    const [toggleAddPlate, setToggleAddPlate] = useState(false);
    const { saveUserPlate } = useSaveUserPlate();
    const { deleteUserPlate } = useDeleteUserPlate();
    const [isLoadingSavePlate, setIsLoadingSavePlate] = useState(false);
    const [isLoadingDeletePlate, setIsLoadingDeletePlate] = useState({
        state: false,
        itemInd: null,
    });
    const savePlate = (plate) => {
        setPlates(prevState => [...prevState, plate]);
        setToggleAddPlate(false);
        setNewData({ ...data, plate: newPlate });
        setNewPlate('');
    };

    const handleSavePlate = () => {
        saveUserPlate({
            savePlate,
            plate: newPlate,
            setIsLoadingSavePlate,
        });
    };

    const deletePlate = (plate) => {
        let index = plates.indexOf(plate);
        let _plates = [...plates];
        _plates.splice(index, 1);
        if (_plates.length > index) {
            setNewData({ ...data, plate: _plates[index] });
        } else {
            index--;
            if (_plates.length !== 0) {
                setNewData({
                    ...data,
                    plate: _plates[_plates.length - 1],
                });
            } else {
                setNewData({ ...data, plate: 'NONE' });
            }
        }
        setPlates(_plates);
    };

    const handleDeletePlate = (e, plate) => {
        e.stopPropagation();
        let ind = plates.indexOf(plate);
        deleteUserPlate({ deletePlate, plate, ind, setIsLoadingDeletePlate });
    };

    return (
        <SessionInfo>
            <PlateAndAddPlateBtnWrapper
                center={sessionStatus !== null}
            >
                {!toggleAddPlate ? (
                    <PlateSelectInput
                        MenuProps={MenuProps}
                        name='plate'
                        onChange={onFormChange}
                        value={data.plate}
                        renderValue={(v) => v}
                        inputProps={{
                            readOnly:
                                sessionStatus === null
                                    ? false
                                    : true,
                        }}
                        $show={sessionStatus === null}
                    >
                        <DropdownItem value='NONE'>
                            <em>NONE</em>
                        </DropdownItem>
                        {!isLoadingPlates &&
                            plates.map((p, ind) => (
                                <PlateDropdownItem key={ind} value={p}>
                                    {p}
                                    {isLoadingDeletePlate.state &&
                                    isLoadingDeletePlate.itemInd === ind ? (
                                        <AbsoluteLoader
                                            containerStyle={{
                                                width: '41.19px',
                                                height: '41.19px',
                                            }}
                                        />
                                    ) : (
                                        <IconButton
                                            style={{
                                                padding: '3px',
                                                zIndex: 100,
                                            }}
                                            onClick={(e) =>
                                                handleDeletePlate(e, p, ind)
                                            }
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                    )}
                                </PlateDropdownItem>
                            ))}
                    </PlateSelectInput>
                ) : (
                    <Input
                        autoFocus
                        disabled={
                            sessionStatus === null
                                ? false
                                : true
                        }
                        name='newPlate'
                        style={{
                            width: '49%',
                            textAlign: 'center',
                        }}
                        value={newPlate}
                        onChange={(e) => setNewPlate(e.target.value)}
                    />
                )}
                {sessionStatus === null ? (
                    !toggleAddPlate ? (
                        <AddPlate onClick={() => setToggleAddPlate(true)}>
                            <AddIcon />
                            таблица
                        </AddPlate>
                    ) : isLoadingSavePlate ? (
                        <AbsoluteLoader
                            containerStyle={{
                                width: '59.44px',
                                height: '59.44px',
                                margin: 'auto',
                            }}
                        />
                    ) : (
                        <SavePlate onClick={handleSavePlate}>
                            <SaveIcon />
                            сочувај
                        </SavePlate>
                    )
                ) : null}
            </PlateAndAddPlateBtnWrapper>
            <ZoneSelectInput
                MenuProps={MenuProps}
                name='zone'
                onChange={onFormChange}
                value={data.zone}
                inputProps={{
                    readOnly:
                        sessionStatus === null
                            ? false
                            : true,
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
        </SessionInfo>
    );
};

export default SessionUser;
