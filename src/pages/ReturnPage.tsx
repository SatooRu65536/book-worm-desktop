import Loading from '@/components/Loading';
import { usePasoriEvent } from '@/hooks/usePasori';
import useSteps, { Step } from '@/hooks/useSteps';
import { sleep } from '@/util';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Message = styled.p`
  font-size: 1em;
  text-align: center;
  color: var(--background);
`;

const LoadingSnap = styled(Loading)`
  margin: 10px auto;
`;

const steps: Step[] = [
  {
    id: 'book',
    message: '本をかざしてください.',
  },
  {
    id: 'submit',
    message: '返却処理中...',
  },
  {
    id: 'finish',
    message: '返却完了',
  },
];

interface ReturmPageProps {
  close: () => void;
}

const ReturnPage = (props: ReturmPageProps): ReactElement => {
  const { close } = props;

  const [step, { handleNext }] = useSteps(steps);
  const subscribeIdm = useCallback(handleReadIdm, [step.id]);
  const { start, stop } = usePasoriEvent(subscribeIdm);
  const [message, setMessage] = useState(step.message);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await start();
      if (res.success) return;

      setMessage(res.message);
      setLoading(false);
      await sleep(3000);
      close();
    })();
    return () => stop();
  }, []);

  useEffect(() => {
    setLoading(step.index < 1);
  }, [step.id]);

  function handleReadIdm(idm: string) {
    console.log({ idm });
    const stepSnap = handleNext();
    setMessage(stepSnap.message);
    submit();
  }

  function submit() {
    handleNext();
    setTimeout(() => {
      close();
    }, 3000);
  }

  return (
    <Container>
      <Message>{message}</Message>
      {loading && <LoadingSnap />}
    </Container>
  );
};

export default ReturnPage;
