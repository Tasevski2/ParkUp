import { useContext } from 'react';
import { AccessoriesContext } from '../context/AccessoriesContext';
import { UserContext } from '../context/UserContext';
import { useHistory } from 'react-router-dom';

const useLogoutUser = () => {
    const { setAlert } = useContext(AccessoriesContext);
    const { setUser } = useContext(UserContext);
    const history = useHistory();
    const logoutUser = async () => {
        setUser(null);
        localStorage.clear();
        setAlert({
            type: 'success',
            msg: 'Успешно Сте Одјавени!', // TODO change msg to err.message
        });
        history.push('/');
    };
    return {
        logoutUser,
    };
};

export default useLogoutUser;
