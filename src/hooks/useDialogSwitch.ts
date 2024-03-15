import { atom, useAtom } from 'jotai';

const openedAtom = atom<string | undefined>(undefined);

const useDialogSwitch = <T extends readonly string[]>() => {
  const [openedPage, setOpenedPage] = useAtom(openedAtom);

  const open = (page: T[number]) => {
    if (page === openedPage) return;

    if (openedPage === undefined) {
      setOpenedPage(page);
    } else if (openedPage) {
      setOpenedPage(undefined);
      setTimeout(() => setOpenedPage(page), 300);
    }
  };

  const close = () => {
    setOpenedPage(undefined);
  };

  return [openedPage, { open, close }] as const;
};

export default useDialogSwitch;
