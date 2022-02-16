import { useState } from 'react';

const useForm = (editData) => {
  const [data, setData] = useState({ ...editData });

  const onFormChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const setNewData = (newData) => {
    setData({...newData});
  }
  return {
    data,
    onFormChange,
    setNewData
  };
};

export default useForm;
