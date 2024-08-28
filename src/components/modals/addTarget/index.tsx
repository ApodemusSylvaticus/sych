import { BaseModal } from '../index.tsx';
import { TextArea, TextField } from '../../input';
import { useModalStore } from '../../../store/modals.ts';
import React, { useCallback, useEffect, useState } from 'react';
import { Tags } from './tags';
import { TargetType } from './targetType';
import { SaveButton } from '../style.ts';
import { ITarget } from '../../../store/target.ts';
import { IMarker, useMarkerStore } from '../../../store/markers.ts';
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

  const onButtonClick = useCallback(
    (data: IMarker) => {
      addMarker({ ...data, timeStamp: Date.now() });
      closeNewTargetModal();
      closePopup();
    },
    [addMarker],
  );

  return (
    <BaseModal id={'add_new_target'} closeAction={closeNewTargetModal} isOpen={addNewTargetState.isOpen}>
      <AddTargetForm
        saveAction={onButtonClick}
        marker={{ timeStamp: 0, tags: [], notes: '', coords: addNewTargetState.coords, target: { src: '', value: '', type: 'target' } }}
      />
    </BaseModal>
  );
};

interface AddTargetFormProps {
  marker: IMarker;
  saveAction: (data: IMarker) => void;
}

export const AddTargetForm: React.FC<AddTargetFormProps> = ({ marker, saveAction }) => {
  const [localLat, setLocalLat] = useState<string>(marker.coords.lat.toString());
  const [localLon, setLocalLon] = useState<string>(marker.coords.lon.toString());
  const [localAlt, setLocalAlt] = useState<string>(marker.coords.alt.toString());
  const [targetType, setTargetType] = useState<ITarget>(marker.target.type === 'empty' ? { value: '', src: '', type: 'target' } : marker.target);
  const [notes, setNotes] = useState<string>(marker.notes);
  const [tags, setTags] = useState<string[]>(marker.tags);
  const { t } = useTranslation();

  useEffect(() => {
    setLocalAlt(marker.coords.alt.toString());
    setLocalLat(marker.coords.lat.toString());
    setLocalLon(marker.coords.lon.toString());
    setTargetType(marker.target.type === 'empty' ? { value: '', src: '', type: 'target' } : marker.target);
    setNotes(marker.notes);
    setTags(marker.tags);
  }, [marker]);

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
    saveAction({ notes, tags, target: targetType, coords: { lon: +localLon, alt: +localAlt, lat: +localLat }, timeStamp: marker.timeStamp });
  }, [notes, saveAction, tags, targetType, localLon, localAlt, localLat, marker]);

  return (
    <ColumnContainer>
      <TextField id={'lat'} label={t('default_lat')} value={localLat} onChange={onLatChange} />
      <TextField id={'lon'} label={t('default_lon')} value={localLon} onChange={onLonChange} />
      <TextField id={'alt'} label={t('default_alt')} value={localAlt} onChange={onAltChange} />

      <TargetType target={targetType} setTargetType={setTargetType} />

      <Tags tags={tags} setTags={setTags} />

      <TextArea id={'notes'} label={t('default_notes')} value={notes} onChange={(e) => setNotes(e.target.value)} />
      <SaveButton onClick={onButtonClick}>{t('default_save')}</SaveButton>
    </ColumnContainer>
  );
};
