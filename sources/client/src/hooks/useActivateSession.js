import { useState, useContext } from 'react';
import axios from 'axios';
import { AccessoriesContext } from '../context/AccessoriesContext';

const useActivateSession = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAlert } = useContext(AccessoriesContext);

  const activateSession = async ({
    pssId,
    parkingSpaceName,
    onActivateSession,
  }) => {
    setIsLoading(true);
    axios
        .put(
            `/parkingSession/verify/${pssId}?parkingSpaceName=${parkingSpaceName}`)
        .then((res) => {
            // res.data is the new updated active zone
            setAlert({
                type: 'success',
                msg: 'Сесијата е успешно активирана!',
            });
            onActivateSession({ updatedSession:res.data });
        })
        .catch((err) => {
          console.log(err);
            setAlert({
                type: 'error',
                msg: 'Проблеми со серверот!',
            });
        })
        .finally(() => {
            setIsLoading(false);
        });
  };
  return {
    activateSession,
    isLoading,
  };
};

export default useActivateSession;
