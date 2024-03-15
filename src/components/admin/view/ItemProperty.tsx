import { ReactElement } from 'react';
import styled from 'styled-components';

const ItemWrapper = styled.div`
  font-size: 1.3rem;
  padding: 10px;
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / 3;
`;

interface ItemViewProps {
  title: string;
  value: string | number | ReactElement;
}

const ItemProperty = (props: ItemViewProps) => {
  const { title, value } = props;

  return (
    <ItemWrapper>
      <p>{title}</p>
      <p>:{value}</p>
    </ItemWrapper>
  );
};

export default ItemProperty;
