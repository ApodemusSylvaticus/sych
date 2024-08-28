import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BaseModalWithoutContainer } from '../index.tsx';
import { useModalStore } from '../../../store/modals.ts';
import { useTranslation } from 'react-i18next';
import { Container, ContentContainer, CoordSpan, InvisibleComponent, TagTab, Type } from './style.ts';
import { BaseColumnContainer, BaseRowContainerWithWrap } from '../../containers/style.ts';
import { LastElemWrapper } from '../addTarget/tags/style.ts';
import { TextArea, TextField } from '../../input';
import { Button } from '../../button/style.ts';
import { AddTargetForm } from '../addTarget';

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
  const [isChangeable, setIsChangeable] = useState<boolean>(false);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const viewContentRef = useRef<HTMLDivElement>(null);
  const editContentRef = useRef<HTMLDivElement>(null);

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
          <LastElemWrapper key={el}>
            <TagTab>{el}</TagTab>
          </LastElemWrapper>
        ) : (
          <TagTab key={el}>{el}</TagTab>
        ),
      ),
    [markerInfoModalState.marker.tags],
  );

  useEffect(() => {
    const updateHeight = () => {
      const viewHeight = viewContentRef.current?.scrollHeight || 0;
      const editHeight = editContentRef.current?.scrollHeight || 0;
      setContainerHeight(isChangeable ? editHeight : viewHeight);
    };

    if (markerInfoModalState.isOpen) {
      const timeoutId = setTimeout(updateHeight, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [isChangeable, markerInfoModalState.isOpen]);

  useEffect(() => {
    if (!markerInfoModalState.isOpen) {
      setContainerHeight(0);
      setIsChangeable(false);
    }
  }, [markerInfoModalState.isOpen]);

  const toggleChangeable = () => {
    setIsChangeable((prev) => !prev);
  };

  return (
    <BaseModalWithoutContainer isOpen={markerInfoModalState.isOpen} closeAction={closeMarkerInfoModal} id={'markerInfoModal'}>
      <Container height={containerHeight}>
        <ContentContainer className={isChangeable ? 'inactive' : 'active'}>
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
          {markerInfoModalState.marker.target.type === 'target' && <Button onClick={toggleChangeable}>Edit</Button>}
          {markerInfoModalState.marker.target.type === 'empty' && <Button onClick={toggleChangeable}>Fill</Button>}
        </ContentContainer>

        <ContentContainer className={!isChangeable ? 'inactive' : 'active'}>
          <AddTargetForm saveAction={} marker={} />
        </ContentContainer>
      </Container>

      <InvisibleComponent ref={viewContentRef}>
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
        {markerInfoModalState.marker.target.type === 'target' && <Button onClick={toggleChangeable}>Edit</Button>}
        {markerInfoModalState.marker.target.type === 'empty' && <Button onClick={toggleChangeable}>Fill</Button>}
      </InvisibleComponent>
      <InvisibleComponent ref={editContentRef}>
        <Type>
          {t(markerInfoModalState.marker.target.value)} {formattedDate}
        </Type>
        <BaseColumnContainer>
          <TextField id={'lat'} label={t('default_lat')} value={markerInfoModalState.marker.coords.lat} />
          <TextField id={'lon'} label={t('default_lon')} value={markerInfoModalState.marker.coords.lon} />
          <TextField id={'alt'} label={t('default_alt')} value={markerInfoModalState.marker.coords.alt} />
        </BaseColumnContainer>

        <BaseColumnContainer>
          <TextField id={'lat'} label={t('default_lat')} value={markerInfoModalState.marker.coords.lat} />
          <TextField id={'lon'} label={t('default_lon')} value={markerInfoModalState.marker.coords.lon} />
          <TextField id={'alt'} label={t('default_alt')} value={markerInfoModalState.marker.coords.alt} />
        </BaseColumnContainer>

        <BaseColumnContainer>
          <TextField id={'lat'} label={t('default_lat')} value={markerInfoModalState.marker.coords.lat} />
          <TextField id={'lon'} label={t('default_lon')} value={markerInfoModalState.marker.coords.lon} />
          <TextField id={'alt'} label={t('default_alt')} value={markerInfoModalState.marker.coords.alt} />
        </BaseColumnContainer>

        <BaseColumnContainer>
          <TextField id={'lat'} label={t('default_lat')} value={markerInfoModalState.marker.coords.lat} />
          <TextField id={'lon'} label={t('default_lon')} value={markerInfoModalState.marker.coords.lon} />
          <TextField id={'alt'} label={t('default_alt')} value={markerInfoModalState.marker.coords.alt} />
        </BaseColumnContainer>

        <BaseColumnContainer>
          <TextField id={'lat'} label={t('default_lat')} value={markerInfoModalState.marker.coords.lat} />
          <TextField id={'lon'} label={t('default_lon')} value={markerInfoModalState.marker.coords.lon} />
          <TextField id={'alt'} label={t('default_alt')} value={markerInfoModalState.marker.coords.alt} />
        </BaseColumnContainer>

        <BaseRowContainerWithWrap>{memoizedTargets}</BaseRowContainerWithWrap>
        {markerInfoModalState.marker.notes.trim() !== '' && (
          <>
            <div />
            <TextArea id={'notes_info'} label={t('default_notes')} value={markerInfoModalState.marker.notes} />
          </>
        )}
        <Button onClick={toggleChangeable}>Save</Button>
      </InvisibleComponent>
    </BaseModalWithoutContainer>
  );
};
