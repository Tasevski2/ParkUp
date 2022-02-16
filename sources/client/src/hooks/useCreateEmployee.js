import { useState, useContext } from 'react';
import axios from 'axios';
import { AccessoriesContext } from '../context/AccessoriesContext';
import { useHistory } from 'react-router-dom';

const useCreateEmployee = () => {
    const { setAlert, setIsBackdropLoaderOpen } =
        useContext(AccessoriesContext);
    const history = useHistory();
    const createEmployee = async ({ employee }) => {
        setIsBackdropLoaderOpen(true);
        console.log(employee);
        await axios
            .post(`/vraboten`, employee) // TODO CHANGE OBJECT
            .then((res) => {
                setAlert({
                    type: 'success',
                    msg: `Вработениот ${employee.firstName} ${employee.lastName} е успешно креирана!`,
                });
                history.push('/employees');
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
        createEmployee,
    };
};

export default useCreateEmployee;
