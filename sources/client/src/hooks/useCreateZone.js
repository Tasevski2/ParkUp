import { useState, useContext } from 'react';
import axios from 'axios';
import { AccessoriesContext } from '../context/AccessoriesContext';

const useCreateZone = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setAlert } = useContext(AccessoriesContext);

    const createZone = async ({
        zoneName,
        setModalInput,
        setModalOpen,
        addNewZoneToData,
    }) => {
        setIsLoading(true);
        await axios
            .post(`/parkingZoneName`, zoneName)
            .then((res) => {
                setAlert({
                    type: 'success',
                    msg: `Зоната ${zoneName} е успешно креирана!`,
                });
                setModalOpen(false);
                setModalInput('');
                console.log(res.data);
                addNewZoneToData({ ...res.data });
            })
            .catch((err) => {
                // ALERT FOR ERROR WITH ERROR MSG
                console.log(err);
                setAlert({
                    type: 'error',
                    msg: 'Проблеми со серверот!', // TODO change msg to err.message
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return {
        createZone,
        isLoading,
    };
};

export default useCreateZone;
