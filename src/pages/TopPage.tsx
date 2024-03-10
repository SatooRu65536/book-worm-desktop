import { ReactElement } from 'react';
import styled from 'styled-components';
import logo from '@/assets/logo.svg';
import { Link  } from 'react-router-dom';

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

const ButtonArea = styled(Link)`
  color: var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  border: 3px solid var(--primary);
  border-radius: 10px;
  cursor: pointer;
`;

const TopPage = (): ReactElement => {
  return (
    <Container>
      <Center>
        <Logo src={logo} alt="logo" />
        <Title>Welcome to BookWorm</Title>
        <ButtonWrapper>
          <ButtonArea to="/lending">貸出</ButtonArea>
          <ButtonArea to="/return">返却</ButtonArea>
        </ButtonWrapper>
      </Center>
    </Container>
  );
};

export default TopPage;

