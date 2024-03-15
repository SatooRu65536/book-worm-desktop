import useItems from '@/hooks/useItems';
import AdminTable from './AdminTable';
import PageLayout from '@/layout/PageLayout';
import Loading from '../Loading';
import AdminDialog from './AdminDialog';

const AdminBody = () => {
  const items = useItems();

  return (
    <PageLayout title="管理画面">
      <AdminDialog />

      {items.state === 'hasData' && <AdminTable items={items.data} />}
      {items.state === 'loading' && <Loading dark />}
    </PageLayout>
  );
};

export default AdminBody;
