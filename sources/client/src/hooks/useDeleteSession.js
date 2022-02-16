import { useState, useContext } from 'react';
import axios from 'axios';
import { AccessoriesContext } from '../context/AccessoriesContext';

const useDeleteSession = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAlert } = useContext(AccessoriesContext);

  const deleteSession = async ({ pssId, onDeleteSession }) => {
    setIsLoading(true);
    await axios
        .delete(`/parkingSession/${pssId}`) 
        .then((res) => {
            setAlert({
                type: 'success',
                msg: `Сесијата е успешно избришана!`, //
            });

            onDeleteSession({ pssId });
        })
        .catch((err) => {
            // ALERT FOR ERROR WITH ERROR MSG
            setAlert({
                type: 'error',
                msg: 'Проблеми со серверот!', // TODO change msg to err.message
            });
            console.log(err);
        })
        .finally(() => {
            setIsLoading(false);
        });
  };

  return {
    deleteSession,
    isLoading,
  };
};

export default useDeleteSession;
