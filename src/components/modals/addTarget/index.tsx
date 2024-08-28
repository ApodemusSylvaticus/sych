import { BaseModal } from '../index.tsx';
import { TextArea, TextField } from '../../input';
import { useModalStore } from '../../../store/modals.ts';
import React, { useCallback, useEffect, useState } from 'react';
import { Tags } from './tags';
import { TargetType } from './targetType';
import { SaveButton } from '../style.ts';
import { ITarget } from '../../../store/target.ts';
import { useMarkerStore } from '../../../store/markers.ts';
import { usePopupStore } from '../../../store/popup.ts';
import { useTranslation } from 'react-i18next';
import { ColumnContainer } from '../../filters/style.ts';

export const AddTargetModal: React.FC = () => {
  const { addNewTargetState, closeNewTargetModal } = useModalStore((state) => ({
    addNewTargetState: state.addNewTargetState,
    closeNewTargetModal: state.closeNewTargetModal,
  }));

  const closePopup = usePopupStore((state) => state.closePopup);
  const addMarker = useMarkerStore((state) => state.addMarker);

  const [localLat, setLocalLat] = useState<string>(addNewTargetState.coords.lat.toString());
  const [localLon, setLocalLon] = useState<string>(addNewTargetState.coords.lon.toString());
  const [localAlt, setLocalAlt] = useState<string>(addNewTargetState.coords.alt.toString());
  const [targetType, setTargetType] = useState<ITarget>({ value: '', src: '', type: 'target' });
  const [notes, setNotes] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (addNewTargetState.isOpen) {
      setLocalAlt(addNewTargetState.coords.alt.toString());
      setLocalLat(addNewTargetState.coords.lat.toString());
      setLocalLon(addNewTargetState.coords.lon.toString());
      setNotes('');
      return;
    }
  }, [addNewTargetState]);

  const validateAndSetValue = useCallback((value: string, setter: React.Dispatch<React.SetStateAction<string>>, min: number, max: number) => {
    if (value === '' || value === '-') {
      setter(value);
      return;
    }

    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      setter(value);
    }
  }, []);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>, min: number, max: number) => {
      let value = event.target.value;

      const regex = /^-?\d*\.?\d*$/;
      if (!regex.test(value)) {
        return;
      }

      if (value.length > 1 && value[0] === '0' && value[1] !== '.') {
        value = value.slice(1);
      }

      if (value.endsWith('.') && !value.slice(0, -1).includes('.')) {
        setter(value);
        return;
      }

      validateAndSetValue(value, setter, min, max);
    },
    [validateAndSetValue],
  );

  const onLatChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleInputChange(event, setLocalLat, -90, 90);
    },
    [handleInputChange],
  );

  const onLonChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleInputChange(event, setLocalLon, -180, 180);
    },
    [handleInputChange],
  );

  const onAltChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleInputChange(event, setLocalAlt, -1000, 100000);
    },
    [handleInputChange],
  );
  const onButtonClick = useCallback(() => {
    addMarker({ notes, tags, target: targetType, coords: { lon: +localLon, alt: +localAlt, lat: +localLat }, timeStamp: Date.now() });
    closeNewTargetModal();
    closePopup();
  }, [notes, addMarker, tags, targetType, localLon, localAlt, localLat]);

  return (
    <BaseModal id={'add_new_target'} closeAction={closeNewTargetModal} isOpen={addNewTargetState.isOpen}>
      <ColumnContainer>
        <TextField id={'lat'} label={t('default_lat')} value={localLat} onChange={onLatChange} />
        <TextField id={'lon'} label={t('default_lon')} value={localLon} onChange={onLonChange} />
        <TextField id={'alt'} label={t('default_alt')} value={localAlt} onChange={onAltChange} />

        <TargetType setTargetType={setTargetType} />

        <Tags setTags={setTags} />

        <TextArea id={'notes'} label={t('default_notes')} value={notes} onChange={(e) => setNotes(e.target.value)} />
        <SaveButton onClick={onButtonClick}>{t('default_save')}</SaveButton>
      </ColumnContainer>
    </BaseModal>
  );
};
