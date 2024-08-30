import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMarkerStore } from '../../../store/markers.ts';
import { BaseModal } from '../../modals';
import { SubmitButton } from '../style.ts';
import { ButtonsContainer, Question } from './style.ts';
import { Button } from '../../button/style.ts';

export const DeleteButton: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const cleanAll = useMarkerStore((state) => state.cleanAll);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SubmitButton onClick={() => setIsOpen(true)}>{t('default_delete_all_markers')}</SubmitButton>

      <BaseModal id={'clean_marker'} isOpen={isOpen} closeAction={() => setIsOpen(false)}>
        <Question>{t('default_are_you_sure')}</Question>
        <ButtonsContainer>
          <Button
            onClick={() => {
              cleanAll();
              setIsOpen(false);
            }}
          >
            {t('default_accept')}
          </Button>
          <Button onClick={() => setIsOpen(false)}>{t('default_reject')}</Button>
        </ButtonsContainer>
      </BaseModal>
    </>
  );
});
