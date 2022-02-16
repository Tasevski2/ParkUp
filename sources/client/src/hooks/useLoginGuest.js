import { useContext } from 'react';
import axios from 'axios';
import jwt from 'jwt-decode';
import { AccessoriesContext } from '../context/AccessoriesContext';
import { UserContext } from '../context/UserContext';
import useLogin from './useLogin';

const useLoginGuest = () => {
    const { setAlert, setIsBackdropLoaderOpen } =
        useContext(AccessoriesContext);
    const { loginUser } = useLogin();
    const loginGuest = async ({ credentials }) => {
        setIsBackdropLoaderOpen(true);
        await axios
            .post(`/guest`, credentials)
            .then(async ({ data: guest }) => {
                await loginUser({
                    email: guest.email,
                    password: guest.password,
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
        loginGuest,
    };
};

export default useLoginGuest;
