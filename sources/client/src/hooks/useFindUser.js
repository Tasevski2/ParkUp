import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import jwt from 'jwt-decode';

const useFindUser = ({ setAlert }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const findUser = async () => {
        let token = localStorage.getItem('token');
        try {
            if (!token) throw Error();
            token = JSON.parse(token);
        } catch (err) {
            if (
                location.state === undefined &&
                location.pathname !== '/' &&
                location.pathname !== '/login-guest' &&
                location.pathname !== '/login' &&
                location.pathname !== '/register'
            ) {
                setAlert({
                    type: 'error',
                    msg: 'Не Сте Логирани!', // TODO change msg to err.message
                });
            }
            setIsLoading(false);
            return;
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        await axios
            .get(`/testToken`)
            .then((res) => {
                if(res.status !== 200) throw new Error('Invalid token!');
                const user = jwt(token);
                setUser({
                    firstName: user.fullName.split(' ')[0] ?? '',
                    lastName: user.fullName.split(' ')[1] ?? '',
                    role: user.roles[0] ?? '',
                    id: user.id,
                });
            })
            .catch((err) => {
                localStorage.clear();
                if (
                    location.state === undefined &&
                    location.pathname !== '/' &&
                    location.pathname !== '/login-guest' &&
                    location.pathname !== '/register'
                ) {
                    setAlert({
                        type: 'error',
                        msg: 'Не Сте Логирани!', // TODO change msg to err.message
                    });
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    useEffect(() => {
        findUser();
    }, []);

    return {
        user,
        setUser,
        isLoading,
    };
};

export default useFindUser;
