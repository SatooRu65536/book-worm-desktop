import { usePasoriEvent } from '@/hooks/usePasori';
import { ReactElement, useCallback, useEffect } from 'react';

const LendingPage = (): ReactElement => {
  const subscribeIdm = useCallback((idm: string) => console.log(idm), []);
  const { start, stop } = usePasoriEvent(subscribeIdm);

  useEffect(() => {
    start();

    return () => {
      stop();
    };
  }, []);

  return (
    <div>
      <h1>Start</h1>
    </div>
  );
};

export default LendingPage;
