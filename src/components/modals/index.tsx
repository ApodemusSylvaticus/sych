import React, { PropsWithChildren } from 'react';
import { ContentContainer, FullSizeModalContainer, OpacityFullSizeContainer } from './style.ts';
import { useModalStore } from '../../store/modals.ts';

export const BaseModal: React.FC<PropsWithChildren> = ({ children }) => {
  const closeNewTargetModal = useModalStore((state) => state.closeNewTargetModal);
  return (
    <FullSizeModalContainer>
      <OpacityFullSizeContainer onClick={closeNewTargetModal} />
      <ContentContainer>{children}</ContentContainer>
    </FullSizeModalContainer>
  );
};
