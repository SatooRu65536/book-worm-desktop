import { atom } from 'jotai';
import { Item } from './selectItem';

const fetchItems = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const items: Item[] = [
    { id: 1, title: 'ペンギン図鑑', idm: '123', type: '本' },
    { id: 2, title: 'ペンギンの生物学', idm: '456', type: '本' },
    { id: 3, title: 'ぺんぎんかんそくたい', idm: '789', type: '本' },
    { id: 4, title: 'iPad big', idm: '101', type: 'スマホ' },
  ];

  return items;
};

export const itemsAtom = atom(async () => await fetchItems());
