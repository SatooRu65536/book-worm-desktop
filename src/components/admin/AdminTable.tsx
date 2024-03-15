import styled from 'styled-components';
import { Item } from '@/store/selectItem';
import { useSelectItem } from '@/hooks/useSelectItem';
import { useDialog } from '@/hooks/useDialog';

const Table = styled.table`
  padding: 40px 20px;
  width: 100%;
  table-layout: fixed;
`;

const Th = styled.th<{ $w?: number }>`
  padding: 10px 10px;
  width: ${({ $w }) => ($w ? `${$w}rem` : 'auto')};
  font-size: 1.3rem;
  overflow-x: hidden;
  background-color: var(--background-dark);
`;

const Tr = styled.tr`
  cursor: pointer;
`;

const Td = styled.td`
  padding: 20px 10px;
  font-size: 1.3rem;
  border-bottom: 1px solid var(--background-dark);
`;

interface AdminTableProps {
  items: Item[];
}

const AdminTable = (props: AdminTableProps) => {
  const { items } = props;
  const [selectItem, select] = useSelectItem();
  const [_, { open }] = useDialog();

  const handleSelect = (item: Item) => {
    console.log(selectItem);
    select(item.id);
    open();
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <Th $w={10}>備品ID</Th>
            <Th $w={18}>備品IDm</Th>
            <Th $w={10}>備品タイプ</Th>
            <Th>備品名</Th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <Tr key={item.id} onClick={() => handleSelect(item)}>
              <Td>{item.id}</Td>
              <Td>{item.idm}</Td>
              <Td>{item.type}</Td>
              <Td>{item.title}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AdminTable;
