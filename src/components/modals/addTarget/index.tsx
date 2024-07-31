import { BaseModal } from '../index.tsx';
import { TextField } from '../../input';
import { useModalStore } from '../../../store/modals.ts';
import React, { useCallback, useEffect, useState } from 'react';

export const AddTargetModal: React.FC = () => {
  const addNewTargetState = useModalStore((state) => state.addNewTargetState);

  const [localLat, setLocalLat] = useState<string>(addNewTargetState.coords.lat.toString());
  const [localLon, setLocalLon] = useState<string>(addNewTargetState.coords.lon.toString());
  const [localAlt, setLocalAlt] = useState<string>(addNewTargetState.coords.alt.toString());

  useEffect(() => {
    setLocalAlt(addNewTargetState.coords.alt.toString());
    setLocalLat(addNewTargetState.coords.lat.toString());
    setLocalLon(addNewTargetState.coords.lon.toString());
  }, [addNewTargetState.isOpen]);

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

      // Разрешаем только цифры, точку и минус
      const regex = /^-?\d*\.?\d*$/;
      if (!regex.test(value)) {
        return;
      }

      // Заменяем ведущий ноль
      if (value.length > 1 && value[0] === '0' && value[1] !== '.') {
        value = value.slice(1);
      }

      // Обрабатываем случай, когда пользователь пытается ввести точку
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

  return (
    <BaseModal>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <TextField id={'lat'} label={'Lat'} value={localLat} onChange={onLatChange} />
        <TextField id={'lon'} label={'Lon'} value={localLon} onChange={onLonChange} />
        <TextField id={'alt'} label={'Alt'} value={localAlt} onChange={onAltChange} />

        <div style={{ border: '1px solid black', textAlign: 'center' }}>
          <span>Тип цілі</span>
        </div>

        <div style={{ border: '1px solid black', textAlign: 'center' }}>
          <span>Теги</span>
        </div>

        <TextField id={'lat'} label={'Примітки'} type={'text'} />
      </div>
    </BaseModal>
  );
};
