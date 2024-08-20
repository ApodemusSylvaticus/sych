import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CardContainer } from '../../containers/cardStyle';
import { Button, CardName, ColumnContainer, RightSideContainer } from '../style';
import { TextField } from '../../input';
import { CheckMark, CheckpointContainer, CheckpointLabel, DatePickerOverlay, HiddenCheckbox, ModalContent, StyledCheckbox } from './style';
import { useFilterStore } from '../../../store/filter';
import 'react-day-picker/style.css';
import { DayPicker, DateRange } from 'react-day-picker';
import { BaseModalWithoutContainer } from '../../modals';
import { useTranslation } from 'react-i18next';
import { uk } from 'date-fns/locale';
import './dayPicker.css';
import { useSettingsStore } from '../../../store/settings';

const ukrainianLocale = {
  locale: uk,
  months: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
  weekdays: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота'],
  weekdaysShort: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
};

export const TimeFilter: React.FC = React.memo(() => {
  const [checked, setChecked] = useState(false);
  const [isFilterAvailable, setIsFilterAvailable] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const { addTimeFilter, setOnlySession } = useFilterStore((state) => ({ addTimeFilter: state.addTimeFilter, setOnlySession: state.setOnlySession }));
  const [range, setRange] = useState<DateRange | undefined>({ from: undefined, to: undefined });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const language = useSettingsStore((state) => state.language);

  useEffect(() => {
    const today = new Date();
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    setToDate(formatDate(today));
    setFromDate(formatDate(oneWeekAgo));
    setRange({ from: oneWeekAgo, to: today });
  }, []);

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const handleCheckBoxClick = useCallback(() => {
    setChecked((prev) => {
      setOnlySession(!prev);
      return !prev;
    });
  }, [setOnlySession]);

  useEffect(() => {
    if (isFilterAvailable) {
      addTimeFilter({ from: fromDate ? new Date(fromDate).getTime() : -1, to: toDate ? new Date(toDate).getTime() : -1 });
    } else {
      addTimeFilter({ from: -1, to: -1 });
    }
  }, [isFilterAvailable, fromDate, toDate, addTimeFilter]);

  const handleRangeSelect = (newRange: DateRange | undefined) => {
    setRange(newRange);
  };

  const save = () => {
    setIsModalOpen(false);
    if (range?.to) setToDate(formatDate(range.to));
    if (range?.from) setFromDate(formatDate(range.from));
  };

  const calendarLocal = useMemo(() => {
    return language === 'ua' ? ukrainianLocale : undefined;
  }, [language]);

  return (
    <CardContainer>
      <CardName>{t('default_time_filter')}</CardName>
      <ColumnContainer>
        <div style={{ position: 'relative' }}>
          <DatePickerOverlay onClick={() => setIsModalOpen(true)} />
          <TextField
            label={t('default_from')}
            id={'from'}
            value={fromDate}
            disabled
            labelStyle={{ background: '#121212', color: 'white' }}
            inputStyle={{ background: '#121212', color: 'white' }}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <DatePickerOverlay onClick={() => setIsModalOpen(true)} />
          <TextField
            label={t('default_to')}
            id={'to'}
            disabled
            value={toDate}
            labelStyle={{ background: '#121212', color: 'white' }}
            inputStyle={{ background: '#121212', color: 'white' }}
          />
        </div>

        <CheckpointContainer>
          <HiddenCheckbox checked={checked} onClick={handleCheckBoxClick} />
          <StyledCheckbox>
            {checked && (
              <CheckMark viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </CheckMark>
            )}
          </StyledCheckbox>
          <CheckpointLabel>{t('default_only_this_session')}</CheckpointLabel>
        </CheckpointContainer>
      </ColumnContainer>
      <RightSideContainer>
        <Button onClick={() => setIsFilterAvailable(!isFilterAvailable)} isActive={isFilterAvailable}>
          {isFilterAvailable ? t('default_enabled') : t('default_disabled')}
        </Button>
      </RightSideContainer>

      <BaseModalWithoutContainer
        isOpen={isModalOpen}
        closeAction={() => {
          setIsModalOpen(false);
        }}
        id={'dayPickerModal'}
      >
        <ModalContent>
          <DayPicker {...calendarLocal} mode="range" selected={range} onSelect={handleRangeSelect} />
          <Button onClick={save} isActive={true}>
            {t('default_save')}
          </Button>
        </ModalContent>
      </BaseModalWithoutContainer>
    </CardContainer>
  );
});
