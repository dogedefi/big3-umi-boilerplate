import { useContext } from 'react';
import { RefreshContext } from '@/contexts/RefreshContext';

// dependency to trigger refresh
const useRefresh = () => {
    const { fast, slow } = useContext(RefreshContext);
    return { fastRefresh: fast, slowRefresh: slow };
};

export default useRefresh;
