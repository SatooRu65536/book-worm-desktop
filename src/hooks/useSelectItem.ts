import { Item, selectItemAtom } from '@/store/selectItem';
import { useAtom } from 'jotai';

export const useSelectItem = () => {
  const [selectedItem, setItemId] = useAtom(selectItemAtom);

  const select = (id: Item['id']) => {
    setItemId(id);
  };

  return [selectedItem, select] as const;
};
