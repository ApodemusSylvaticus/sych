import { BaseModal } from '../index.tsx';
import { TextField } from '../../input';

export const AddTargetModal: React.FC = () => {
  return (
    <BaseModal>
      <TextField id={'q'} label={'Label'} placeholder={'placeholder'} />
      <TextField id={'q'} label={'Label'} placeholder={'placeholder'} />
    </BaseModal>
  );
};
