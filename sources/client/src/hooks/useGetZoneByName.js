import { useState,useContext } from 'react';
import axios from 'axios';
import { AccessoriesContext } from '../context/AccessoriesContext';

const useGetZoneByName = (defaultZoneInfo) => {
    const [zone, setZone] = useState(defaultZoneInfo);
    const [isLoading, setIsLoading] = useState(false);
    const { setAlert } = useContext(AccessoriesContext);
    const fetchZone = async (pzName) => {
        setIsLoading(true);
        return await axios
            .get(`/parkingZone/name/${pzName}`)
            .then((res) => {
                setZone(res.data);
                return res.data;
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
    return {
        zone,
        isLoading,
        fetchZone,
        setZone
    };
};

export default useGetZoneByName;
