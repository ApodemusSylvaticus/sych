import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useGeoImgsStore } from '../../../store/geoImgs.ts';
import { SubmitButton } from '../style.ts';
import { BaseModal } from '../../modals';
import { useTranslation } from 'react-i18next';
import { TextField } from '../../input';
import { ManagerContainer, Container, TextFieldsContainer, ImgCardsContainer, ContainerCardName, SaveButton, ActiveButton } from './style.ts';
import { CardName } from '../../modals/addTarget/tags/style.ts';
import { GeoImgCard } from './geoImgCard.tsx';
import styled from 'styled-components';

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

export const AddNewGeoImgModal: React.FC<{ isOpen: boolean; close: () => void }> = ({ isOpen, close }) => {
  const addImg = useGeoImgsStore((state) => state.addImg);
  const { t } = useTranslation();

  const [corners, setCorners] = useState<CornersState>({
    topLeft: { lon: '', lat: '' },
    topRight: { lon: '', lat: '' },
    bottomRight: { lon: '', lat: '' },
    bottomLeft: { lon: '', lat: '' },
  });
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCornerChange = useCallback((corner: keyof CornersState, field: keyof CornerState, value: string) => {
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

  const areCornersValid = useMemo(
    () =>
      !isNaN(parseFloat(corners.topLeft.lon)) &&
      !isNaN(parseFloat(corners.topLeft.lat)) &&
      !isNaN(parseFloat(corners.topRight.lon)) &&
      !isNaN(parseFloat(corners.topRight.lat)) &&
      !isNaN(parseFloat(corners.bottomRight.lon)) &&
      !isNaN(parseFloat(corners.bottomRight.lat)) &&
      !isNaN(parseFloat(corners.bottomLeft.lon)) &&
      !isNaN(parseFloat(corners.bottomLeft.lat)),
    [corners],
  );

  const handleSubmit = useCallback(() => {
    if (image && areCornersValid) {
      const newImg = {
        uniqKey: `img_${Date.now()}`,
        src: image,
        isShown: true,
        leftTopCorner: { lon: parseFloat(corners.topLeft.lon), lat: parseFloat(corners.topLeft.lat), alt: 0 },
        rightTopCorner: { lon: parseFloat(corners.topRight.lon), lat: parseFloat(corners.topRight.lat), alt: 0 },
        rightBottomCorner: { lon: parseFloat(corners.bottomRight.lon), lat: parseFloat(corners.bottomRight.lat), alt: 0 },
        leftBottomCorner: { lon: parseFloat(corners.bottomLeft.lon), lat: parseFloat(corners.bottomLeft.lat), alt: 0 },
      };
      console.log('newImg', newImg);
      addImg(newImg);
      close();
    }
  }, [image, corners, addImg, areCornersValid]);

  return (
    <BaseModal isOpen={isOpen} closeAction={close} id={'add_new_geo_img'}>
      <Container>
        <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleImageUpload} />
        <ActiveButton onClick={handleSetImgClick}>Set img</ActiveButton>
        {image && (
          <ImageContainer>
            <StyledImage src={image} alt="Current" />
          </ImageContainer>
        )}
        <TextFieldsContainer>
          <CardName>Top left corner</CardName>
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
          <CardName>Top right corner</CardName>
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
          <CardName>Bottom right corner</CardName>
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
          <CardName>Bottom left corner</CardName>
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
        <SaveButton isDisabled={!areCornersValid || image === null || image === ''} onClick={handleSubmit}>
          Save Image
        </SaveButton>
      </Container>
    </BaseModal>
  );
};

export const GeoImgManager: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const geoImgs = useGeoImgsStore((state) => state.geoImgs);

  const [isOpen, setIsOpen] = useState(false);
  const closeAction = useCallback(() => setIsOpen(false), [setIsOpen]);

  if (geoImgs.length === 0) {
    return (
      <>
        <SubmitButton onClick={() => setIsOpen(true)}>Geo img</SubmitButton>
        <AddNewGeoImgModal isOpen={isOpen} close={closeAction} />
      </>
    );
  }

  return (
    <ManagerContainer>
      <ContainerCardName>Geo img</ContainerCardName>
      <ImgCardsContainer>
        {geoImgs.map((img) => (
          <GeoImgCard {...img} />
        ))}
      </ImgCardsContainer>
      <SubmitButton onClick={() => setIsOpen(true)}>Add geo img</SubmitButton>
      <AddNewGeoImgModal isOpen={isOpen} close={closeAction} />
    </ManagerContainer>
  );
});
