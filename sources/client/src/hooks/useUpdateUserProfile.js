import { useContext } from 'react';
import axios from 'axios';
import { AccessoriesContext } from '../context/AccessoriesContext';

const useUpdateUserProfile = () => {
    const { setAlert, setIsBackdropLoaderOpen } =
        useContext(AccessoriesContext);
    const updateUserProfile = async ({ userData, id, successfulSave }) => {
        setIsBackdropLoaderOpen(true);
        await axios
            .put(`/registriranParkirac/${id}`, userData)
            .then((res) => {
                setAlert({
                    type: 'success',
                    msg: `Успешно ажурирање на податоците!`,
                });
                successfulSave();
            })
            .catch((err) => {
                // ALERT FOR ERROR WITH ERROR MSG
                setAlert({
                    type: 'error',
                    msg: 'Проблеми со серверот!', // TODO change msg to err.message
                });
            })
            .finally(() => {
                setIsBackdropLoaderOpen(false);
            });
    };

    return {
        updateUserProfile,
    };
};

export default useUpdateUserProfile;
