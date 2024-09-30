import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BaseModalWithoutContainer } from '../index.tsx';
import { useModalStore } from '../../../store/modals.ts';
import { useTranslation } from 'react-i18next';
import { ChangeButton, Container, ContentContainer, CoordSpan, InvisibleComponent, LastRowContainer, TagTab, Type } from './style.ts';
import { BaseColumnContainer, BaseRowContainerWithWrap } from '../../containers/style.ts';
import { LastElemWrapper } from '../addTarget/tags/style.ts';
import { TextArea } from '../../input';
import { AddTargetForm } from '../addTarget';
import { ImgCard, ImgContainer } from '../style.ts';
import { Button } from '../../button/style.ts';
import { setRotateToGps } from '../../../mainApp/ts/cmd/cmdSender/cmdRotary.ts';
import { useMarkerStore } from '../../../store/markers.ts';
import { IMarker, TargetTypeEnum } from '../../../interface/markers.ts';
import { assertNever } from '../../../interface/baseComponentsInterface.ts';

const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `- ${hours}:${minutes} | ${day}.${month}.${year}`;
};

export const MarkerInfoModal: React.FC = () => {
  const { t } = useTranslation();

  const markerInfoModalState = useModalStore((state) => state.markerInfoModalState);
  const closeMarkerInfoModal = useModalStore((state) => state.closeMarkerInfoModal);

  const updateMarker = useMarkerStore((state) => state.updateMarker);
  const fillEmptyMarker = useMarkerStore((state) => state.fillEmptyMarker);
  const selfMarker = useMarkerStore((state) => state.selfMarker);
  const allMarkers = useMarkerStore((state) => state.allMarkers);
  const emptyMarkers = useMarkerStore((state) => state.emptyMarkers);

  const [localState, setLocalState] = useState<IMarker>({
    uniqKey: '',
    notes: '',
    files: [],
    target: { type: TargetTypeEnum.empty, src: '', value: '' },
    coords: { lon: 0, lat: 0, alt: 0 },
    tags: [],
    timeStamp: 0,
  });

  const isAlreadyOpen = useRef(false);

  useEffect(() => {
    if (markerInfoModalState.isOpen && markerInfoModalState.marker && !isAlreadyOpen.current) {
      const { type, uniqKey } = markerInfoModalState.marker;

      if (type === TargetTypeEnum.self) {
        setLocalState({
          notes: '',
          files: [],
          tags: [],
          timeStamp: 0,
          ...selfMarker,
        });
        isAlreadyOpen.current = true;
      } else if (type === TargetTypeEnum.empty) {
        const data = emptyMarkers.find((el) => el.uniqKey === uniqKey);
        if (data === undefined) {
          throw new Error('Empty marker not found');
        }
        setLocalState({
          notes: '',
          files: [],
          target: { type: TargetTypeEnum.empty, src: '', value: '' },
          tags: [],
          ...data,
        });
        isAlreadyOpen.current = true;
      } else if (type === TargetTypeEnum.target) {
        const data = allMarkers.find((el) => el.uniqKey === uniqKey);
        if (data === undefined) {
          throw new Error('Target marker not found');
        }
        setLocalState(data);
        isAlreadyOpen.current = true;
      } else {
        assertNever(type);
      }
    }

    if (!markerInfoModalState.isOpen) {
      isAlreadyOpen.current = false;
    }
  }, [markerInfoModalState, allMarkers, selfMarker, emptyMarkers]);

  const [fullSizeImgState, setFullSizeImgState] = useState<{ isOpen: boolean; file: string }>({ isOpen: false, file: '' });

  const [isChangeable, setIsChangeable] = useState<boolean>(false);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  const viewContentRef = useRef<HTMLDivElement>(null);
  const editContentRef = useRef<HTMLDivElement>(null);

  const formattedDate = useMemo(() => {
    if (localState.timeStamp === -1) {
      return '';
    }
    const date = new Date(localState.timeStamp);
    return formatDate(date);
  }, [localState]);

  const memoizedTargets = useMemo(
    () =>
      localState.tags.map((el, index) =>
        index === localState.tags.length - 1 ? (
          <LastElemWrapper key={el}>
            <TagTab>{el}</TagTab>
          </LastElemWrapper>
        ) : (
          <TagTab key={el}>{el}</TagTab>
        ),
      ),
    [localState.tags],
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
    localState.target.type === TargetTypeEnum.empty ? fillEmptyMarker(data) : updateMarker(data);
    setLocalState(data);
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
    setRotateToGps(localState.coords.lon, localState.coords.lat, 0);
  }, [closeMarkerInfoModal, localState.coords.lat, localState.coords.lon]);

  return (
    <BaseModalWithoutContainer isOpen={markerInfoModalState.isOpen} closeAction={closeMarkerInfoModal} id={'markerInfoModal'}>
      <Container height={containerHeight}>
        <ContentContainer className={isChangeable ? 'inactive' : 'active'}>
          <Type>
            {t(localState.target.value)} {formattedDate}
          </Type>
          <BaseColumnContainer>
            <CoordSpan>
              {t('default_lat')}: {localState.coords.lat}
            </CoordSpan>
            <CoordSpan>
              {t('default_lon')}: {localState.coords.lon}
            </CoordSpan>
            {/* <CoordSpan>*/}
            {/*  {t('default_alt')}: {localState.coords.alt}*/}
            {/* </CoordSpan>*/}
          </BaseColumnContainer>

          <BaseRowContainerWithWrap>{memoizedTargets}</BaseRowContainerWithWrap>
          {localState.notes.trim() !== '' && (
            <>
              <div />
              <TextArea id={'notes_info'} label={t('default_notes')} value={localState.notes} disabled />
            </>
          )}
          {localState.files.length !== 0 && (
            <ImgContainer>
              {localState.files.map((el, index) => (
                <ImgCard onClick={() => handleImgClick(el)} key={index} src={el} alt={`Uploaded ${index + 1}`} />
              ))}
            </ImgContainer>
          )}
          {localState.target.type !== TargetTypeEnum.self && (
            <LastRowContainer>
              <Button onClick={handleAimHere}>{t('default_aim_here')}</Button>
              {localState.target.type === TargetTypeEnum.target && <ChangeButton onClick={toggleChangeable}>{t('default_edit')}</ChangeButton>}
              {localState.target.type === TargetTypeEnum.empty && <ChangeButton onClick={toggleChangeable}>{t('default_fill')}</ChangeButton>}
            </LastRowContainer>
          )}
        </ContentContainer>

        <ContentContainer className={!isChangeable ? 'inactive' : 'active'}>
          <AddTargetForm saveAction={saveAction} marker={localState} />
        </ContentContainer>
      </Container>

      <InvisibleComponent ref={viewContentRef}>
        <Type>
          {t(localState.target.value)} {formattedDate}
        </Type>
        <BaseColumnContainer>
          <CoordSpan>
            {t('default_lat')}: {localState.coords.lat}
          </CoordSpan>
          <CoordSpan>
            {t('default_lon')}: {localState.coords.lon}
          </CoordSpan>
          {/* <CoordSpan>*/}
          {/*  {t('default_alt')}: {localState.coords.alt}*/}
          {/* </CoordSpan>*/}
        </BaseColumnContainer>

        <BaseRowContainerWithWrap>{memoizedTargets}</BaseRowContainerWithWrap>
        {localState.notes.trim() !== '' && (
          <>
            <div />
            <TextArea id={'notes_info'} label={t('default_notes')} value={localState.notes} disabled />
          </>
        )}
        {localState.files.length !== 0 && (
          <ImgContainer>
            {localState.files.map((el, index) => (
              <ImgCard key={index} src={el} alt={`Uploaded ${index + 1}`} />
            ))}
          </ImgContainer>
        )}
        {localState.target.type !== TargetTypeEnum.self && (
          <LastRowContainer>
            <Button>{t('default_aim_here')}</Button>
            {localState.target.type === TargetTypeEnum.target && <ChangeButton onClick={toggleChangeable}>{t('default_edit')}</ChangeButton>}
            {localState.target.type === TargetTypeEnum.empty && <ChangeButton onClick={toggleChangeable}>{t('default_fill')}</ChangeButton>}
          </LastRowContainer>
        )}
      </InvisibleComponent>
      <InvisibleComponent ref={editContentRef}>
        <AddTargetForm saveAction={saveAction} marker={localState} />
      </InvisibleComponent>
      <BaseModalWithoutContainer isOpen={fullSizeImgState.isOpen} closeAction={handleCloseFullSizeImg} id={'fullSizeImg'}>
        <img src={fullSizeImgState.file} style={{ maxWidth: '70%', position: 'absolute', zIndex: 100 }} />
      </BaseModalWithoutContainer>
    </BaseModalWithoutContainer>
  );
};
