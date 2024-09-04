import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IGeoImg, useGeoImgsStore } from '../../../store/geoImgs.ts';
import { ActiveButton, Container, ImgCard, ImgCardDisabledTab, TextFieldsContainer } from './style.ts';
import { useTranslation } from 'react-i18next';
import { BaseModal } from '../../modals';
import { Button, DeleteButton } from '../../button/style.ts';
import { CardName } from '../../modals/addTarget/tags/style.ts';
import { TextField } from '../../input';
import styled from 'styled-components';
import { ButtonsContainer, Question } from '../cleanButton/style.ts';

interface CornerState {
  lon: string;
  lat: string;
}

interface CornersState {
  topLeft: CornerState;
  topRight: CornerState;
  bottomRight: CornerState;
  bottomLeft: CornerState;
}

const ImageContainer = styled.div`
  max-height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const StyledImage = styled.img`
  max-height: 200px;
  width: auto;
  object-fit: contain;
`;

export const GeoImgModal: React.FC<{ isOpen: boolean; close: () => void; data: IGeoImg }> = ({ isOpen, close, data }) => {
  const { changeImage, deleteImage } = useGeoImgsStore((state) => ({ changeImage: state.changeImage, deleteImage: state.deleteImage }));
  const { t } = useTranslation();
  console.log('data', data);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [corners, setCorners] = useState<CornersState>({
    topLeft: { lon: '', lat: '' },
    topRight: { lon: '', lat: '' },
    bottomRight: { lon: '', lat: '' },
    bottomLeft: { lon: '', lat: '' },
  });
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data) {
      setCorners({
        topLeft: { lon: data.leftTopCorner.lon.toString(), lat: data.leftTopCorner.lat.toString() },
        topRight: { lon: data.rightTopCorner.lon.toString(), lat: data.rightTopCorner.lat.toString() },
        bottomRight: { lon: data.rightBottomCorner.lon.toString(), lat: data.rightBottomCorner.lat.toString() },
        bottomLeft: { lon: data.leftBottomCorner.lon.toString(), lat: data.leftBottomCorner.lat.toString() },
      });
      setImage(data.src);
    }
  }, [data]);

  const handleCornerChange = useCallback((corner: keyof CornersState, field: keyof CornersState[keyof CornersState], value: string) => {
    setCorners((prev) => ({
      ...prev,
      [corner]: {
        ...prev[corner],
        [field]: value,
      },
    }));
  }, []);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSetImgClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleOpenDeleteModal = useCallback(() => setIsDeleteModalOpen(true), [setIsDeleteModalOpen]);
  const handleCloseDeleteModal = useCallback(() => setIsDeleteModalOpen(false), [setIsDeleteModalOpen]);
  const handleDelete = useCallback(() => {
    setIsDeleteModalOpen(false);
    close();
    deleteImage(data.uniqKey);
  }, [close, deleteImage, data.uniqKey]);

  const handleChangeIsShown = useCallback(() => {
    changeImage({ ...data, isShown: !data.isShown });
    close();
  }, [data, changeImage]);
  const handleSubmit = useCallback(() => {
    if (image) {
      const updatedImg: IGeoImg = {
        ...data,
        src: image,
        leftTopCorner: { lon: parseFloat(corners.topLeft.lon), lat: parseFloat(corners.topLeft.lat) },
        rightTopCorner: { lon: parseFloat(corners.topRight.lon), lat: parseFloat(corners.topRight.lat) },
        rightBottomCorner: { lon: parseFloat(corners.bottomRight.lon), lat: parseFloat(corners.bottomRight.lat) },
        leftBottomCorner: { lon: parseFloat(corners.bottomLeft.lon), lat: parseFloat(corners.bottomLeft.lat) },
      };
      changeImage(updatedImg);
      close();
    }
  }, [image, corners, data, changeImage, close]);

  return (
    <>
      <BaseModal isOpen={isOpen} closeAction={close} id={'edit_geo_img'}>
        <Container>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleImageUpload} />
          <ActiveButton onClick={handleSetImgClick}>{t('default_attach_photo')}</ActiveButton>
          {image && (
            <ImageContainer>
              <StyledImage src={image} alt="Current" />
            </ImageContainer>
          )}
          <TextFieldsContainer>
            <CardName>{t('default_top_left')}</CardName>
            <TextField
              label={t('default_lon')}
              id={'topLeft_lon'}
              type={'number'}
              value={corners.topLeft.lon}
              onChange={(e) => handleCornerChange('topLeft', 'lon', e.target.value)}
            />
            <TextField
              label={t('default_lat')}
              id={'topLeft_lat'}
              type={'number'}
              value={corners.topLeft.lat}
              onChange={(e) => handleCornerChange('topLeft', 'lat', e.target.value)}
            />
          </TextFieldsContainer>
          <TextFieldsContainer>
            <CardName>{t('default_top_right')}</CardName>
            <TextField
              label={t('default_lon')}
              id={'topRight_lon'}
              type={'number'}
              value={corners.topRight.lon}
              onChange={(e) => handleCornerChange('topRight', 'lon', e.target.value)}
            />
            <TextField
              label={t('default_lat')}
              id={'topRight_lat'}
              type={'number'}
              value={corners.topRight.lat}
              onChange={(e) => handleCornerChange('topRight', 'lat', e.target.value)}
            />
          </TextFieldsContainer>
          <TextFieldsContainer>
            <CardName>{t('default_bottom_right')}</CardName>
            <TextField
              label={t('default_lon')}
              id={'bottomRight_lon'}
              type={'number'}
              value={corners.bottomRight.lon}
              onChange={(e) => handleCornerChange('bottomRight', 'lon', e.target.value)}
            />
            <TextField
              label={t('default_lat')}
              id={'bottomRight_lat'}
              type={'number'}
              value={corners.bottomRight.lat}
              onChange={(e) => handleCornerChange('bottomRight', 'lat', e.target.value)}
            />
          </TextFieldsContainer>
          <TextFieldsContainer>
            <CardName>{t('default_bottom_left')}</CardName>
            <TextField
              label={t('default_lon')}
              id={'bottomLeft_lon'}
              type={'number'}
              value={corners.bottomLeft.lon}
              onChange={(e) => handleCornerChange('bottomLeft', 'lon', e.target.value)}
            />
            <TextField
              label={t('default_lat')}
              id={'bottomLeft_lat'}
              type={'number'}
              value={corners.bottomLeft.lat}
              onChange={(e) => handleCornerChange('bottomLeft', 'lat', e.target.value)}
            />
          </TextFieldsContainer>
          <ActiveButton onClick={handleSubmit}>{t('default_save')}</ActiveButton>
          <ActiveButton onClick={handleChangeIsShown}>{data.isShown ? t('default_disable_custom_map') : t('default_enable_custom_map')}</ActiveButton>

          <DeleteButton onClick={handleOpenDeleteModal}>{t('default_delete')}</DeleteButton>
        </Container>
      </BaseModal>

      <BaseModal id={'clean_geo_img'} isOpen={isDeleteModalOpen} closeAction={handleCloseDeleteModal}>
        <Question>{t('default_are_you_sure_delete_custom_map')}</Question>
        <ButtonsContainer>
          <DeleteButton onClick={handleDelete}>{t('default_accept')}</DeleteButton>
          <Button onClick={handleCloseDeleteModal}>{t('default_reject')}</Button>
        </ButtonsContainer>
      </BaseModal>
    </>
  );
};

export const GeoImgCard: React.FC<IGeoImg> = React.memo((data) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);
  const open = useCallback(() => setIsOpen(true), []);
  const { t } = useTranslation();

  return (
    <>
      <ImgCard onClick={open} backgroundImage={data.src}>
        {data.isShown === false && <ImgCardDisabledTab>{t('default_disabled')}</ImgCardDisabledTab>}
      </ImgCard>
      <GeoImgModal close={close} data={data} isOpen={isOpen} />
    </>
  );
});
