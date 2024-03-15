import { itemsAtom } from '@/store/items';
import { useAtomValue } from 'jotai';

const useItems = () => {
  return useAtomValue(itemsAtom);
};

export default useItems;
