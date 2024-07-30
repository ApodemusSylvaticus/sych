import React, { useState } from 'react';
import { Container, FirstLine, MenuButtonContainer, SecondLine, ThirdLine } from './style.ts';

export const Menu: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return <Container isActive={isOpen}></Container>;
};

export const MenuManipulationButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MenuButtonContainer isActive={isOpen} onClick={() => setIsOpen((prev) => !prev)}>
        <FirstLine isActive={isOpen} />
        <SecondLine isActive={isOpen} />
        <ThirdLine isActive={isOpen} />
      </MenuButtonContainer>
      <Menu isOpen={isOpen} />
    </>
  );
};
