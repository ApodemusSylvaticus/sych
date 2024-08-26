import React, { useEffect, useState } from 'react';
import { CardName, Container } from '../tags/style.ts';
import { ITarget, useTargetStore } from '../../../../store/target.ts';
import { Button, Wrapper } from './style.ts';
import { useTranslation } from 'react-i18next';

export const TargetType: React.FC<{ setTargetType: (value: ITarget) => void }> = ({ setTargetType }) => {
  const targets = useTargetStore((state) => state.targets);
  const [selected, setSelected] = useState(targets[0]);
  const { t } = useTranslation();

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
