import React, { useEffect, useState } from 'react';
import { CardContainer } from '../../containers/cardStyle.ts';
import { Button, CardName, ColumnContainer, RightSideContainer } from '../style.ts';
import { TextField } from '../../input';
import { CheckMark, CheckpointContainer, CheckpointLabel, HiddenCheckbox, StyledCheckbox } from './style.ts';

export const TimeFilter: React.FC = React.memo(() => {
  const [checked, setChecked] = useState(false);
  const [isFilterAvailable, setIsFilterAvailable] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  useEffect(() => {
    const today = new Date();
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    setToDate(formatDate(today));
    setFromDate(formatDate(oneWeekAgo));
  }, []);

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  return (
    <CardContainer>
      <CardName>Time filter</CardName>
      <ColumnContainer>
        <TextField
          label={'From'}
          id={'from'}
          type={'date'}
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          labelStyle={{ background: '#121212', color: 'white' }}
          inputStyle={{ background: '#121212', color: 'white' }}
        />
        <TextField
          label={'To'}
          id={'to'}
          type={'date'}
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          labelStyle={{ background: '#121212', color: 'white' }}
          inputStyle={{ background: '#121212', color: 'white' }}
        />
        <CheckpointContainer>
          <HiddenCheckbox checked={checked} onClick={() => setChecked(!checked)} />
          <StyledCheckbox>
            {checked && (
              <CheckMark viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </CheckMark>
            )}
          </StyledCheckbox>
          <CheckpointLabel>Only this session</CheckpointLabel>
        </CheckpointContainer>
      </ColumnContainer>
      <RightSideContainer>
        <Button isActive={true}>Enable</Button>
        <Button onClick={() => setIsFilterAvailable(!isFilterAvailable)} isActive={isFilterAvailable}>
          {isFilterAvailable ? 'Enable' : 'Disabled'}
        </Button>
      </RightSideContainer>
    </CardContainer>
  );
});
