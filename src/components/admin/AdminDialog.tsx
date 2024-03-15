import Dialog from '../Dialog';
import { useSelectItem } from '@/hooks/useSelectItem';
import { useDialog } from '@/hooks/useDialog';
import styled from 'styled-components';
import Loading from '../Loading';
import ItemView from './ItemView';

const DialogWrap = styled(Dialog)`
  font-size: 1rem;
  color: var(--background);
`;

const AdminDialog = () => {
  const [opened, { close }] = useDialog();
  const [selectItems] = useSelectItem();

  return (
    <DialogWrap opend={opened} close={close}>
      {selectItems === undefined ? <Loading /> : <ItemView item={selectItems} />}
    </DialogWrap>
  );
};

export default AdminDialog;
