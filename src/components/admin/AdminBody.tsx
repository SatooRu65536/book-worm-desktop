import AdminTable from './AdminTable';
import PageLayout from '@/layout/PageLayout';

const AdminBody = () => {
  return (
    <PageLayout title="管理画面">
      <AdminTable />
    </PageLayout>
  );
};

export default AdminBody;
