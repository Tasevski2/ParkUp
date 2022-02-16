import { useState, useContext } from 'react';
import axios from 'axios';
import { AccessoriesContext } from '../context/AccessoriesContext';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import useLogoutUser from './useLogoutUser';
import { roles } from '../config/enums';

const useUserPayForSession = () => {
    const {user} = useContext(UserContext);
    const {logoutUser} = useLogoutUser();
    const [isLoading, setIsLoading] = useState(false);
    const { setAlert } = useContext(AccessoriesContext);
    const history = useHistory();
    const userPayForSession = async ({ method, paymentCredentials }) => {
        setIsLoading(true);
        await axios
            .put(
                `/parkingSession/pay?expireDate=${paymentCredentials?.cardExpDate ?? ''}`,
                {
                    method,
                    paymentCredentials,
                }
            )
            .then((res) => {
                setAlert({
                    type: 'success',
                    msg: `Успешно плаќање!`,
                });
                if(user.role === roles.guest) {
                    logoutUser();
                } else {
                    history.push('/');
                }
            })
            .catch((err) => {
                // ALERT FOR ERROR WITH ERROR MSG
                setAlert({
                    type: 'error',
                    msg: 'Проблеми со серверот!', // TODO change msg to err.message
                });
                setIsLoading(false);
            });
    };

    return {
        userPayForSession,
        isLoading,
    };
};

export default useUserPayForSession;
