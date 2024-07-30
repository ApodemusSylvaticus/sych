import React, { PropsWithChildren } from 'react';
import { ContentContainer, FullSizeModalContainer, OpacityFullSizeContainer } from './style.ts';

export const BaseModal: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <FullSizeModalContainer>
      <OpacityFullSizeContainer />
      <ContentContainer>{children}</ContentContainer>
    </FullSizeModalContainer>
  );
};
