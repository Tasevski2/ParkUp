import { useState } from 'react';
import axios from 'axios';

const useGetSessionOverInfo = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(null);

    const getSessionInfoOver = async () => {
        setIsLoading(true);
        await axios
            .get(`/parkingSession/end/calculate`)
            .then((res) => {
                // setTimeAndSessionPrice({totalTime: res.data.totalTime, totalPrice: res.data.totalPrice});
                setTotalPrice(res.data);
            })
            .catch((err) => {
                // setAlert({
                //     type: 'error',
                //     msg: 'Проблеми со серверот!', // TODO change msg to err.message
                // });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return {
        getSessionInfoOver,
        isLoading,
        totalPrice,
    };
};

export default useGetSessionOverInfo;
