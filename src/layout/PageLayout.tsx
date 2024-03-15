import { HTMLProps } from 'react';
import styled from 'styled-components';

const Layout = styled.main`
  padding: 40px 20px;
  height: 100vh;
  width: 100%;
`;

interface PageLayoutProps extends HTMLProps<HTMLDivElement> {
  title: string;
}

const PageLayout = (props: PageLayoutProps) => {
  const { children, title, ...rest } = props;
  return (
    <Layout {...rest}>
      <h1>{title}</h1>
      {children}
    </Layout>
  );
};

export default PageLayout;
