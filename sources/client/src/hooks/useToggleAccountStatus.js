import { useState, useContext } from 'react';
import axios from 'axios';
import { AccessoriesContext } from '../context/AccessoriesContext';

const useToggleAccountStatus = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setAlert } = useContext(AccessoriesContext);

    const toggleAccountStatus = async ({
        workerId,
        changeAccoutStatusOnEmployee,
    }) => {
        setIsLoading(true);
        axios
            .put(`/vraboten/lock/${workerId}`)
            .then((res) => {
                changeAccoutStatusOnEmployee({ workerId });
                setAlert({
                    type: 'success',
                    msg: 'Успешно е променет статусот на акаунтот!',
                });
            })
            .catch((err) => {
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
        toggleAccountStatus,
        isLoading,
    };
};

export default useToggleAccountStatus;
