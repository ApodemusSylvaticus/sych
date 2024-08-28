import React, { useEffect, useState } from 'react';
import { CardName, Container } from '../tags/style.ts';
import { ITarget, useTargetStore } from '../../../../store/target.ts';
import { Button, Wrapper } from './style.ts';
import { useTranslation } from 'react-i18next';

export const TargetType: React.FC<{ target: ITarget; setTargetType: (value: ITarget) => void }> = ({ target, setTargetType }) => {
  const targets = useTargetStore((state) => state.targets);
  const [selected, setSelected] = useState(targets[0]);
  const { t } = useTranslation();

  useEffect(() => {
    const index = targets.findIndex((el) => el.value === target.value);
    if (index !== -1) {
      setSelected(targets[index]);
    }
  }, [target, targets]);

  useEffect(() => {
    setTargetType(selected);
  }, [selected, setTargetType]);
  return (
    <Container>
      <CardName>{t('default_target_type')}</CardName>
      <Wrapper>
        {targets.map((el) => (
          <Button onClick={() => setSelected(el)} isActive={selected.value === el.value}>
            {t(el.value)}
          </Button>
        ))}
      </Wrapper>
    </Container>
  );
};
