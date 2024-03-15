import { atom, useAtom } from 'jotai';

const dialogAtom = atom(false);

export const useDialog = () => {
  const [opened, setOpened] = useAtom(dialogAtom);

  const open = () => {
    setOpened(true);
  };

  const close = () => {
    setOpened(false);
  };

  const toggle = () => {
    setOpened((prev) => !prev);
  };

  return [opened, { open, close, toggle }] as const;
};
