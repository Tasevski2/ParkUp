import { useState, useContext } from 'react';
import axios from 'axios';
import { AccessoriesContext } from '../context/AccessoriesContext';
import { sessionStatus } from '../config/enums';

const useUserFinishedSession = () => {
    const { setAlert, setIsBackdropLoaderOpen } =
        useContext(AccessoriesContext);
    const userFinishedSession = async ({ setSession }) => {
        setIsBackdropLoaderOpen(true);
        await axios
            .put(`/parkingSession/end`) 
            .then((res) => {
                setAlert({
                    type: 'success',
                    msg: 'Успешно завршена сесија!', // TODO change msg
                });
                setSession(res.data);
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
        userFinishedSession,
    };
};

export default useUserFinishedSession;
