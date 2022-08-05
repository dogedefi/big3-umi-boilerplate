import { IndexDB } from '@/config/constant';
import { useMemo } from 'react';
import { useDexie } from 'use-dexie';

const useDexieModel = () => {
    const accessedAccountsDB = useDexie(IndexDB.TASK_ACCESSED_ACCOUNTS, { tasks: 'account' }, 1);

    const dexieLoaded = useMemo(() => Boolean(accessedAccountsDB), [accessedAccountsDB]);

    return { dexieLoaded, accessedAccountsDB };
};

export default useDexieModel;
