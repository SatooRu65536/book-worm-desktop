import { useState } from 'react';

const useDialog = (init: boolean) => {
  const [isOpen, setIsOpen] = useState(init);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen((open) => !open);
  };

  return [isOpen, { open, close, toggle }] as const;
};

export default useDialog;
