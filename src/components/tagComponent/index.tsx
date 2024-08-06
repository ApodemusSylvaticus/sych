import React from 'react';
import { ChosenContainer } from './style.ts';
import { ClickableTab } from '../clickableTab/style.ts';

export const TagComponent: React.FC<{ value: string; onClick: (value: string) => void; isActive: boolean }> = React.memo(
  ({ value, onClick, isActive }) => {
    return (
      <ClickableTab onClick={() => onClick(value)} isActive={isActive}>
        {value}
      </ClickableTab>
    );
  },
);

export const ChosenTagComponent: React.FC<{ value: string }> = ({ value }) => {
  return <ChosenContainer>#{value}</ChosenContainer>;
};
