import useItems from '@/hooks/useItems';
import { useSelectItem } from '@/hooks/useSelectItem';
import styled from 'styled-components';

const Tr = styled.tr`
  cursor: pointer;
`;

const Td = styled.td`
  padding: 20px 10px;
  font-size: 1.3rem;
  border-bottom: 1px solid var(--background-dark);
`;

const AdminTableBody = () => {
  const itemsAtom = useItems();
  const [selectItem, select] = useSelectItem();

  console.log(selectItem);

  return (
    <tbody>
      {itemsAtom.map((item) => (
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
