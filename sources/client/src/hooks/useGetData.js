import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AccessoriesContext } from '../context/AccessoriesContext';

const useGetData = ({ url }) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { setAlert } = useContext(AccessoriesContext);
    const fetchData = async () => {
        await axios
            .get(url)
            .then((res) => {
                setData(res.data);
                console.log(res.data);
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
    }, []);
    return {
        data,
        setData,
        isLoading,
        fetchData
    };
};

export default useGetData;
