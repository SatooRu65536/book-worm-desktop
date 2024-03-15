import { useSelectItem } from '@/hooks/useSelectItem';
import { Item } from '@/store/selectItem';
import styled from 'styled-components';

const Tr = styled.tr`
  cursor: pointer;
`;

const Td = styled.td`
  padding: 20px 10px;
  font-size: 1.3rem;
  border-bottom: 1px solid var(--background-dark);
`;

interface AdminTableBodyProps {
  items: Item[];
}

const AdminTableBody = (props: AdminTableBodyProps) => {
  const { items } = props;
  const [selectItem, select] = useSelectItem();

  console.log(selectItem);

  return (
    <tbody>
      {items.map((item) => (
        <Tr key={item.id} onClick={() => select(item.id)}>
          <Td>{item.id}</Td>
          <Td>{item.idm}</Td>
          <Td>{item.type}</Td>
          <Td>{item.title}</Td>
        </Tr>
      ))}
    </tbody>
  );
};

export default AdminTableBody;
