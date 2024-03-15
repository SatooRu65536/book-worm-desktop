import { atom } from 'jotai';

export interface Item {
  id: number;
  title: string;
  idm: string;
  type: string;
}

const fetchItem = async (id: Item['id']): Promise<Item> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    id,
    idm: `idm-${id}`,
    type: `type-${id}`,
    title: `title-${id}`,
  };
};

const itemAtom = atom<Item | undefined>(undefined);

export const selectItemAtom = atom(
  (get) => get(itemAtom),
  async (_get, set, id: Item['id']) => {
    set(itemAtom, undefined);
    const item = await fetchItem(id);
    set(itemAtom, item);
  }
);
