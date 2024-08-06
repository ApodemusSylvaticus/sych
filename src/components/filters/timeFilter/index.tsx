import React, { useState } from 'react';
import { CardContainer } from '../../containers/cardStyle.ts';
import { Button, CardName, ColumnContainer, RightSideContainer } from '../style.ts';
import { TextField } from '../../input';
import { CheckMark, CheckpointContainer, CheckpointLabel, HiddenCheckbox, StyledCheckbox } from './style.ts';

export const TimeFilter: React.FC = React.memo(() => {
  const [checked, setChecked] = useState(false);

  return (
    <CardContainer>
      <CardName>Time filter</CardName>
      <ColumnContainer>
        <TextField
          label={'From'}
          id={'from'}
          type={'date'}
          labelStyle={{ background: '#121212', color: 'white' }}
          inputStyle={{ background: '#121212', color: 'white' }}
        />
        <TextField
          label={'To'}
          id={'to'}
          type={'date'}
          labelStyle={{ background: '#121212', color: 'white' }}
          inputStyle={{ background: '#121212', color: 'white' }}
        />
        <CheckpointContainer>
          <HiddenCheckbox checked={checked} onClick={() => setChecked(!checked)} />
          <StyledCheckbox checked={checked}>
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
      </RightSideContainer>
    </CardContainer>
  );
});
