import { useState, useContext } from 'react';
import axios from 'axios';
import { AccessoriesContext } from '../context/AccessoriesContext';

const useUpdateZone = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAlert } = useContext(AccessoriesContext);
  const updateZone = async ({ zone, setEditMode, setZone }) => {
    setIsLoading(true);
    console.log(zone);
    await axios
        .put(`/parkingZone/${zone.pzId}`, zone) // TODO CHANGE OBJECT
        .then((res) => {
            setZone(res.data);
            console.log(res.data);
            setAlert({
                type: 'success',
                msg: `Зоната е успешно изменета!`,
            });
            setEditMode(false);
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
    updateZone,
    isLoading,
  };
};

export default useUpdateZone;
