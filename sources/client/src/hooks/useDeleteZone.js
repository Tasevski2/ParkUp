import { useState, useContext } from 'react';
import axios from 'axios';
import { AccessoriesContext } from '../context/AccessoriesContext';
import { useHistory } from 'react-router-dom';

const useDeleteZone = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAlert } = useContext(AccessoriesContext);
  const history = useHistory();
  const deleteZone = async ({ id }) => {
    setIsLoading(true);
    await axios
      .delete(`/parkingZone/${id}`) // TODO CHANGE OBJECT
      .then((res) => {
        setAlert({
          type: 'success',
          msg: `Зоната е успешно избришана!`, // TODO Change MSG - add the first and last name of the deleted emoloyee
        });
        history.push('/');
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
    deleteZone,
    isLoading,
  };
};

export default useDeleteZone;
