import { useSelector } from 'react-redux';

const useUser = () => {
    return useSelector(store => store.user)
  };

export default useUser