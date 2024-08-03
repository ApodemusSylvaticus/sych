import React from 'react';
import { ChosenContainer, Container, Text } from './style.ts';

export const TagComponent: React.FC<{ value: string; onClick: (value: string) => void; isActive: boolean }> = React.memo(
  ({ value, onClick, isActive }) => {
    return (
      <Container onClick={() => onClick(value)} isActive={isActive}>
        <Text>{value}</Text>
      </Container>
    );
  },
);

export const ChosenTagComponent: React.FC<{ value: string }> = ({ value }) => {
  return (
    <ChosenContainer>
      <Text>#{value}</Text>
    </ChosenContainer>
  );
};
