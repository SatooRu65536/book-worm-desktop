import { Item } from '@/store/selectItem';
import styled from 'styled-components';
import ItemProperty from './view/ItemProperty';
import Button from '../Button';

const ItemViewContainer = styled.div`
  padding-right: 40px;
  margin-inline: auto;
  display: flex;
`;

const ItemWrapper = styled.div`
  width: fit-content;
  padding: 10px;
  display: grid;
  grid-template-columns: 100px 200px;
`;

const ButtonWrapper = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column-reverse;
  gap: 20px;
`;

interface ItemViewProps {
  item: Item;
}

const ItemView = (props: ItemViewProps) => {
  const { item } = props;

  return (
    <ItemViewContainer>
      <ItemWrapper>
        <ItemProperty title="ID" value={item.id} />
        <ItemProperty title="IDm" value={item.idm} />
        <ItemProperty title="type" value={item.type} />
        <ItemProperty title="title" value={item.title} />
      </ItemWrapper>

      <ButtonWrapper>
        <Button>編集</Button>
        <Button>削除</Button>
      </ButtonWrapper>
    </ItemViewContainer>
  );
};

export default ItemView;
