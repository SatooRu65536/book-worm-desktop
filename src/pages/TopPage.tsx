import { ReactElement } from 'react';
import styled from 'styled-components';
import logo from '@/assets/logo.svg';
import Dialog from '@/components/Dialog';
import LendingPage from './LendingPage';
import useDialogSwitch from '@/hooks/useDialogSwitch';
import ReturnPage from './ReturnPage';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const Logo = styled.img`
  width: 200px;
`;

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  color: var(--primary);
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  border: 3px solid var(--primary);
  border-radius: 10px;
  cursor: pointer;
`;

const pages = ['lending', 'return'] as const;

const TopPage = (): ReactElement => {
  const [openedPage, { open, close }] = useDialogSwitch<typeof pages>();

  return (
    <Container>
      <Dialog opend={openedPage !== undefined} close={close}>
        <>
          {openedPage === 'lending' && <LendingPage close={close} />}
          {openedPage === 'return' && <ReturnPage close={close} />}
        </>
      </Dialog>

      <Center>
        <Logo src={logo} alt="logo" />
        <Title>Welcome to BookWorm</Title>

        <ButtonWrapper>
          <Button onClick={() => open('lending')}>貸出</Button>
          <Button onClick={() => open('return')}>返却</Button>
        </ButtonWrapper>
      </Center>
    </Container>
  );
};

export default TopPage;
