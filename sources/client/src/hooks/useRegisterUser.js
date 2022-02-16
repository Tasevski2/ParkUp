import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AccessoriesContext } from '../context/AccessoriesContext';

const useRegisterUser = () => {
    const history = useHistory();
    const { setAlert, setIsBackdropLoaderOpen } =
        useContext(AccessoriesContext);
    const registerUser = async (data) => {
        setIsBackdropLoaderOpen(true);
        await axios
            .post(`/registriranParkirac/registration`, data)
            .then((res) => {
                history.replace('/login');
                setAlert({
                    type: 'success',
                    msg: 'За активација проверете ја вашата емаил адреса!', // TODO change msg to err.message
                });
            })
            .catch((err) => {
                console.log(err);
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
        registerUser,
    };
};

export default useRegisterUser;
