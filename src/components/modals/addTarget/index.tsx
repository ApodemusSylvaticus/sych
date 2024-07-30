import { BaseModal } from '../index.tsx';
import { TextField } from '../../input';

export const AddTargetModal: React.FC = () => {
  return (
    <BaseModal>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <TextField id={'q'} label={'Label'} />
        <TextField id={'q'} label={'Label'} />
      </div>
    </BaseModal>
  );
};
