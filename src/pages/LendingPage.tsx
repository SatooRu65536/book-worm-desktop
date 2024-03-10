import { usePasoriEvent } from '@/hooks/usePasori';
import { ReactElement } from 'react';

const LendingPage = (): ReactElement => {
  const { start } = usePasoriEvent((idm) => console.log(idm));

  const handleClick = async () => {
    if (!navigator.usb) {
      console.log('WebUSB not supported');
      return;
    }

    start();
  };

  return (
    <div onClick={handleClick}>
      <h1>Start</h1>
    </div>
  );
};

export default LendingPage;
