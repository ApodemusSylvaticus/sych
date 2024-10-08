import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BaseModalWithoutContainer } from '../index.tsx';
import { useModalStore } from '../../../store/modals.ts';
import { useTranslation } from 'react-i18next';
import { ChangeButton, Container, ContentContainer, CoordSpan, InvisibleComponent, LastRowContainer, TagTab, Type } from './style.ts';
import { BaseColumnContainer, BaseRowContainerWithWrap } from '../../containers/style.ts';
import { LastElemWrapper } from '../addTarget/tags/style.ts';
import { TextArea } from '../../input';
import { AddTargetForm } from '../addTarget';
import { IMarker, useMarkerStore } from '../../../store/markers.ts';
import { ImgCard, ImgContainer } from '../style.ts';
import { Button } from '../../button/style.ts';
import { setRotateToGps } from '../../../mainApp/ts/cmd/cmdSender/cmdRotary.ts';

const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `- ${hours}:${minutes} | ${day}.${month}.${year}`;
};

export const MarkerInfoModal: React.FC = () => {
  const { closeMarkerInfoModal, markerInfoModalState, openMarkerInfoModal } = useModalStore((state) => ({
    markerInfoModalState: state.markerInfoModalState,
    closeMarkerInfoModal: state.closeMarkerInfoModal,
    openMarkerInfoModal: state.openMarkerInfoModal,
  }));

  const { fillEmptyMarker, updateMarker } = useMarkerStore((state) => ({ updateMarker: state.updateMarker, fillEmptyMarker: state.fillEmptyMarker }));
  const [fullSizeImgState, setFullSizeImgState] = useState<{ isOpen: boolean; file: string }>({ isOpen: false, file: '' });
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

  const saveAction = (data: IMarker) => {
    markerInfoModalState.marker.target.type === 'empty' ? fillEmptyMarker(data) : updateMarker(data);
    openMarkerInfoModal(data);
    toggleChangeable();
  };

  const handleImgClick = useCallback((file: string) => {
    setFullSizeImgState({ file, isOpen: true });
  }, []);

  const handleCloseFullSizeImg = useCallback(() => {
    setFullSizeImgState({ isOpen: false, file: '' });
  }, []);

  const handleAimHere = useCallback(() => {
    closeMarkerInfoModal();
    setRotateToGps(markerInfoModalState.marker.coords.lon, markerInfoModalState.marker.coords.lat, 0);
  }, [closeMarkerInfoModal, markerInfoModalState.marker.coords.lat, markerInfoModalState.marker.coords.lon]);

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
            {/* <CoordSpan>*/}
            {/*  {t('default_alt')}: {markerInfoModalState.marker.coords.alt}*/}
            {/* </CoordSpan>*/}
          </BaseColumnContainer>

          <BaseRowContainerWithWrap>{memoizedTargets}</BaseRowContainerWithWrap>
          {markerInfoModalState.marker.notes.trim() !== '' && (
            <>
              <div />
              <TextArea id={'notes_info'} label={t('default_notes')} value={markerInfoModalState.marker.notes} disabled />
            </>
          )}
          {markerInfoModalState.marker.files.length !== 0 && (
            <ImgContainer>
              {markerInfoModalState.marker.files.map((el, index) => (
                <ImgCard onClick={() => handleImgClick(el)} key={index} src={el} alt={`Uploaded ${index + 1}`} />
              ))}
            </ImgContainer>
          )}
          <LastRowContainer>
            <Button onClick={handleAimHere}>{t('default_aim_here')}</Button>
            {markerInfoModalState.marker.target.type === 'target' && <ChangeButton onClick={toggleChangeable}>{t('default_edit')}</ChangeButton>}
            {markerInfoModalState.marker.target.type === 'empty' && <ChangeButton onClick={toggleChangeable}>{t('default_fill')}</ChangeButton>}
          </LastRowContainer>
        </ContentContainer>

        <ContentContainer className={!isChangeable ? 'inactive' : 'active'}>
          <AddTargetForm saveAction={saveAction} marker={{ ...markerInfoModalState.marker }} />
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
          {/* <CoordSpan>*/}
          {/*  {t('default_alt')}: {markerInfoModalState.marker.coords.alt}*/}
          {/* </CoordSpan>*/}
        </BaseColumnContainer>

        <BaseRowContainerWithWrap>{memoizedTargets}</BaseRowContainerWithWrap>
        {markerInfoModalState.marker.notes.trim() !== '' && (
          <>
            <div />
            <TextArea id={'notes_info'} label={t('default_notes')} value={markerInfoModalState.marker.notes} disabled />
          </>
        )}
        {markerInfoModalState.marker.files.length !== 0 && (
          <ImgContainer>
            {markerInfoModalState.marker.files.map((el, index) => (
              <ImgCard key={index} src={el} alt={`Uploaded ${index + 1}`} />
            ))}
          </ImgContainer>
        )}
        <LastRowContainer>
          <Button>{t('default_aim_here')}</Button>
          {markerInfoModalState.marker.target.type === 'target' && <ChangeButton onClick={toggleChangeable}>{t('default_edit')}</ChangeButton>}
          {markerInfoModalState.marker.target.type === 'empty' && <ChangeButton onClick={toggleChangeable}>{t('default_fill')}</ChangeButton>}
        </LastRowContainer>
      </InvisibleComponent>
      <InvisibleComponent ref={editContentRef}>
        <AddTargetForm saveAction={saveAction} marker={{ ...markerInfoModalState.marker }} />
      </InvisibleComponent>
      <BaseModalWithoutContainer isOpen={fullSizeImgState.isOpen} closeAction={handleCloseFullSizeImg} id={'fullSizeImg'}>
        <img src={fullSizeImgState.file} style={{ maxWidth: '70%', position: 'absolute', zIndex: 100 }} />
      </BaseModalWithoutContainer>
    </BaseModalWithoutContainer>
  );
};
