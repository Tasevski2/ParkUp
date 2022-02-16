import { useContext } from 'react';
import axios from 'axios';
import jwt from 'jwt-decode';
import { AccessoriesContext } from '../context/AccessoriesContext';
import { UserContext } from '../context/UserContext';

const useLogin = () => {
    const { setAlert, setIsBackdropLoaderOpen } =
        useContext(AccessoriesContext);
    const { setUser } = useContext(UserContext);
    const loginUser = async ({ email, password }) => {
        setIsBackdropLoaderOpen(true);
        const formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);
        await axios
            .post(`/api/login`, formData)
            .then((res) => {
                const token = res.data.access_token;
                const user = jwt(token);
                axios.defaults.headers.common['Authorization']= `Bearer ${token}`;
                localStorage.setItem('token', JSON.stringify(token));
                setUser({
                    firstName: user.fullName.split(' ')[0] ?? '',
                    lastName: user.fullName.split(' ')[1] ?? '',
                    role: user.roles[0] ?? '',
                    id: user.id,
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
        loginUser,
    };
};

export default useLogin;
