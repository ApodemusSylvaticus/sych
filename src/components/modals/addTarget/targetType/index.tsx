import React, { useEffect, useState } from 'react';
import { CardName, Container } from '../tags/style.ts';
import { ITarget, useTargetStore } from '../../../../store/target.ts';
import { Button, Wrapper } from './style.ts';

export const TargetType: React.FC<{ setTargetType: (value: ITarget) => void }> = ({ setTargetType }) => {
  const targets = useTargetStore((state) => state.targets);
  const [selected, setSelected] = useState(targets[0]);

  useEffect(() => {
    setTargetType(selected);
  }, [selected, setTargetType]);
  return (
    <Container>
      <CardName>Target type</CardName>
      <Wrapper>
        {targets.map((el) => (
          <Button onClick={() => setSelected(el)} isActive={selected.value === el.value}>
            {el.value}
          </Button>
        ))}
      </Wrapper>
    </Container>
  );
};
