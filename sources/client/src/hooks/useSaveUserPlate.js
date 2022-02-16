import { useContext } from 'react';
import axios from 'axios';
import { AccessoriesContext } from '../context/AccessoriesContext';
import { UserContext } from '../context/UserContext';

const useSaveUserPlate = () => {
    const {user} = useContext(UserContext);
    const { setAlert } = useContext(AccessoriesContext);
    const saveUserPlate = async ({
        savePlate,
        plate,
        setIsLoadingSavePlate,
    }) => {
        setIsLoadingSavePlate(true);
        console.log(plate);
        await axios
            .put(`/registriranParkirac/${user.id}/tablici`, plate, {headers: {"Content-type" : 'application/json'}}) 
            .then((res) => {
                setAlert({
                    type: 'success',
                    msg: `Таблицата е успешно додадена!`,
                });
                savePlate(plate); // or res.plate
            })
            .catch((err) => {
                // ALERT FOR ERROR WITH ERROR MSG
                setAlert({
                    type: 'error',
                    msg: 'Проблеми со серверот!', // TODO change msg to err.message
                });
            })
            .finally(() => {
                setIsLoadingSavePlate(false);
            });
    };

    return {
        saveUserPlate,
    };
};

export default useSaveUserPlate;
