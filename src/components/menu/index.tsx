import React, { useCallback, useEffect, useState } from 'react';
import { Container, FirstLine, MenuButtonContainer, SecondLine, SubmitButton, ThirdLine } from './style.ts';
import { usePopupStore } from '../../store/popup.ts';
import { Filters } from '../filters';
import { LanguageSelector, LayerSelector } from './selector';
import { useTranslation } from 'react-i18next';
import { useMarkerStore } from '../../store/markers.ts';

export const Menu: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const { t } = useTranslation();
  const sessionMarkers = useMarkerStore((state) => state.sessionMarkers);

  const submitSession = useCallback(() => {
    const data = sessionMarkers.map((el) => ({ ...el, target: t(el.target.value) }));
    const jsonData = JSON.stringify(data);

    const blob = new Blob([jsonData], { type: 'application/json' });

    const url = URL.createObjectURL(blob);

    const currentDate = new Date().toISOString().split('T')[0];

    const fileName = `sych_${currentDate}.json`;

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }, [sessionMarkers]);
  return (
    <Container isActive={isOpen}>
      <LanguageSelector />
      <LayerSelector />
      <SubmitButton onClick={submitSession}>{t('default_submit_session')}</SubmitButton>
      <Filters />
    </Container>
  );
};

export const MenuManipulationButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closePopup = usePopupStore((state) => state.closePopup);

  useEffect(() => {
    document.documentElement.style.setProperty('--conditional-opacity', isOpen ? '0' : '1');
  }, [isOpen]);
  return (
    <>
      <MenuButtonContainer
        isActive={isOpen}
        onClick={() => {
          closePopup();
          setIsOpen((prev) => !prev);
        }}
        id={'menu'}
        className={isOpen ? 'open' : ''}
      >
        <FirstLine isActive={isOpen} />
        <SecondLine isActive={isOpen} />
        <ThirdLine isActive={isOpen} />
      </MenuButtonContainer>
      <Menu isOpen={isOpen} />
    </>
  );
};
