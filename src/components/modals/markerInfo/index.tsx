import React, { useMemo } from 'react';
import { BaseModalWithoutContainer } from '../index.tsx';
import { useModalStore } from '../../../store/modals.ts';
import { useTranslation } from 'react-i18next';
import { Container, CoordSpan, TagTab, Type } from './style.ts';
import { BaseColumnContainer, BaseRowContainerWithWrap } from '../../containers/style.ts';
import { LastElemWrapper } from '../addTarget/tags/style.ts';
import { TextArea } from '../../input';

const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `- ${hours}:${minutes} | ${day}.${month}.${year}`;
};

export const MarkerInfoModal: React.FC = () => {
  const { closeMarkerInfoModal, markerInfoModalState } = useModalStore((state) => ({
    markerInfoModalState: state.markerInfoModalState,
    closeMarkerInfoModal: state.closeMarkerInfoModal,
  }));

  const { t } = useTranslation();

  const formattedDate = useMemo(() => {
    if (markerInfoModalState.marker.timeStamp === -1) {
      return '';
    }
    const date = new Date(markerInfoModalState.marker.timeStamp);
    return formatDate(date);
  }, [markerInfoModalState.marker]);

  const memoizedTargets = useMemo(
    () =>
      markerInfoModalState.marker.tags.map((el, index) =>
        index === markerInfoModalState.marker.tags.length - 1 ? (
          <LastElemWrapper>
            <TagTab key={el}>{el}</TagTab>
          </LastElemWrapper>
        ) : (
          <TagTab key={el}>{el}</TagTab>
        ),
      ),
    [markerInfoModalState.marker.tags],
  );

  return (
    <BaseModalWithoutContainer isOpen={markerInfoModalState.isOpen} closeAction={closeMarkerInfoModal} id={'markerInfoModal'}>
      <Container>
        <Type>
          {t(markerInfoModalState.marker.target.value)} {formattedDate}
        </Type>
        <BaseColumnContainer>
          <CoordSpan>
            {t('default_lat')}: {markerInfoModalState.marker.coords.lat}
          </CoordSpan>
          <CoordSpan>
            {t('default_lon')}: {markerInfoModalState.marker.coords.lon}
          </CoordSpan>
          <CoordSpan>
            {t('default_alt')}: {markerInfoModalState.marker.coords.alt}
          </CoordSpan>
        </BaseColumnContainer>

        <BaseRowContainerWithWrap>{memoizedTargets}</BaseRowContainerWithWrap>
        {markerInfoModalState.marker.notes.trim() !== '' && (
          <>
            <div />
            <TextArea id={'notes_info'} label={t('default_notes')} value={markerInfoModalState.marker.notes} disabled />
          </>
        )}
      </Container>
    </BaseModalWithoutContainer>
  );
};
