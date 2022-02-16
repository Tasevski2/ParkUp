import { useContext } from 'react';
import axios from 'axios';
import { AccessoriesContext } from '../context/AccessoriesContext';
import { UserContext } from '../context/UserContext';

const useDeleteUserPlate = () => {
    const { user } = useContext(UserContext);
    const { setAlert } = useContext(AccessoriesContext);
    const deleteUserPlate = async ({
        deletePlate,
        plate,
        ind,
        setIsLoadingDeletePlate,
    }) => {
        setIsLoadingDeletePlate({ state: true, itemInd: ind });
        await axios
            .delete(`/registriranParkirac/${user.id}/tablici/${plate}`) // TODO CHANGE OBJECT
            .then((res) => {
                setAlert({
                    type: 'success',
                    msg: `Таблицата е успешно избришана!`, // TODO Change MSG
                });
                deletePlate(plate); // or res.plate
            })
            .catch((err) => {
                // ALERT FOR ERROR WITH ERROR MSG
                setAlert({
                    type: 'error',
                    msg: 'Проблеми со серверот!', // TODO change msg to err.message
                });
            })
            .finally(() => {
                setIsLoadingDeletePlate({ state: false, itemInd: null });
            });
    };

    return {
        deleteUserPlate,
    };
};

export default useDeleteUserPlate;
