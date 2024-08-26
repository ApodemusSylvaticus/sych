import React, { PropsWithChildren, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ContentContainer, FullSizeModalContainer, OpacityFullSizeContainer } from './style.ts';

export const BaseModal: React.FC<PropsWithChildren & { isOpen: boolean; closeAction: () => void; id: string }> = ({
  children,
  isOpen,
  closeAction,
  id,
}) => {
  return (
    <BaseModalWithoutContainer id={id} closeAction={closeAction} isOpen={isOpen}>
      <ContentContainer>{children}</ContentContainer>
    </BaseModalWithoutContainer>
  );
};

export const BaseModalWithoutContainer: React.FC<PropsWithChildren & { isOpen: boolean; closeAction: () => void; id: string }> = ({
  children,
  isOpen,
  closeAction,
  id,
}) => {
  const [isReady, setIsReady] = useState(false);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const modalRootElement = document.createElement('div');
    modalRootElement.id = id;
    document.body.appendChild(modalRootElement);
    setModalRoot(modalRootElement);

    return () => {
      document.body.removeChild(modalRootElement);
    };
  }, []);

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
    return null;
  }

  const modalContent = (
    <FullSizeModalContainer isOpen={isOpen && isReady}>
      <OpacityFullSizeContainer onClick={closeAction} />
      {children}
    </FullSizeModalContainer>
  );

  return modalRoot ? ReactDOM.createPortal(modalContent, modalRoot) : null;
};
