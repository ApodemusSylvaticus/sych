import React, { useState } from 'react';
import { Container, FirstLine, MenuButtonContainer, SecondLine, SubmitButton, ThirdLine } from './style.ts';
import { usePopupStore } from '../../store/popup.ts';
import { Filters } from '../filters';

export const Menu: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <Container isActive={isOpen}>
      <div style={{ color: 'white', border: '1px solid white' }}>Language select</div>
      <div style={{ color: 'white', border: '1px solid white' }}>LAYER SELECT</div>
      <SubmitButton>Submit session</SubmitButton>
      <Filters />
    </Container>
  );
};

export const MenuManipulationButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closePopup = usePopupStore((state) => state.closePopup);

  return (
    <>
      <MenuButtonContainer
        isActive={isOpen}
        onClick={() => {
          closePopup();
          setIsOpen((prev) => !prev);
        }}
      >
        <FirstLine isActive={isOpen} />
        <SecondLine isActive={isOpen} />
        <ThirdLine isActive={isOpen} />
      </MenuButtonContainer>
      <Menu isOpen={isOpen} />
    </>
  );
};
