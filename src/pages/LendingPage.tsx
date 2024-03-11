import { usePasoriEvent } from '@/hooks/usePasori';
import { ReactElement, useEffect } from 'react';

const LendingPage = (): ReactElement => {
  const { start } = usePasoriEvent((idm) => console.log(idm));

  useEffect(() => {
    start();
  }, []);

  return (
    <div>
      <h1>Start</h1>
    </div>
  );
};

export default LendingPage;
