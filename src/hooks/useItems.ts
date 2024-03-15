import { itemAtomLoadable } from '@/store/items';
import { useAtomValue } from 'jotai';

const useItems = () => {
  return useAtomValue(itemAtomLoadable);
};

export default useItems;
