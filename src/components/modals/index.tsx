import React, { PropsWithChildren, useEffect } from 'react';
import { ContentContainer, FullSizeModalContainer, OpacityFullSizeContainer } from './style.ts';
import { useModalStore } from '../../store/modals.ts';

export const BaseModal: React.FC<PropsWithChildren & { isOpen: boolean }> = ({ children, isOpen }) => {
  const closeNewTargetModal = useModalStore((state) => state.closeNewTargetModal);
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsReady(true);
      }, 0);
    } else {
      setTimeout(() => {
        setIsReady(false);
      }, 200);
    }
  }, [isOpen]);

  if (!isOpen && !isReady) {
    return;
  }

  return (
    <FullSizeModalContainer isOpen={isOpen && isReady}>
      <OpacityFullSizeContainer onClick={closeNewTargetModal} />
      <ContentContainer>{children}</ContentContainer>
    </FullSizeModalContainer>
  );
};
