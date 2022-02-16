import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AccessoriesContext } from '../context/AccessoriesContext';

// THIS HOOK SHOULD LISTEN ON SOME PORT FOR CHANGES

const useGetSessions = (zoneId) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setAlert } = useContext(AccessoriesContext);
  const fetchData = async () => {
    await axios
        .get(`/parkingSession/${zoneId}`)
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => {
            // ALERT FOR ERROR WITH ERROR MSG
            setAlert({
                type: 'error',
                msg: 'Проблеми со серверот!', // TODO change msg to err.message
            });
        })
        .finally(() => {
            setIsLoading(false);
        });
  };
  useEffect(() => {
    fetchData();
    const fetchInterval = setInterval(fetchData, 30000);
    return () => {
      clearInterval(fetchInterval);
    };
  }, []);

  return {
    data,
    isLoading,
    setData
  };
};

export default useGetSessions;
