import styled from 'styled-components';
import AdminTableBody from './AdminTableBody';
import { Suspense } from 'react';
import Loading from '../Loading';
import useItems from '@/hooks/useItems';

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

const AdminTable = () => {
  const items = useItems();

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
        <AdminTableBody items={items.state === 'hasData' ? items.data : []} />
      </Table>

      {items.state === 'loading' && <Loading dark />}
    </>
  );
};

export default AdminTable;
