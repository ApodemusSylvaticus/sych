import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTargetStore } from '../../../store/target.ts';
import { ClickableTab } from '../../clickableTab/style.ts';
import { BaseColumnContainer } from '../../containers/style.ts';
import { CardContainer } from '../../containers/cardStyle.ts';
import { Button, CardName, RightSideContainer } from '../style.ts';
import { useFilterStore } from '../../../store/filter.ts';
import { useTranslation } from 'react-i18next';

export const TypeFilters: React.FC = React.memo(() => {
  const targets = useTargetStore((state) => state.targets);
  const { addTypeFilter, switchTypeFilter, isTypeFilterEnabled } = useFilterStore((state) => ({
    addTypeFilter: state.addTypeFilter,
    switchTypeFilter: state.switchTypeFilter,
    isTypeFilterEnabled: state.isTypeFilterEnabled,
  }));
  const [chosenTargets, setChosenTargets] = useState(() => new Set(targets.map((t) => t.value)));
  const { t } = useTranslation();

  useEffect(() => {
    const typeFilterArray = Array.from(chosenTargets);
    addTypeFilter(typeFilterArray);
  }, [addTypeFilter, chosenTargets]);

  const handleClick = useCallback((el: { value: string }) => {
    setChosenTargets((prevChosenTargets) => {
      const newChosenTargets = new Set(prevChosenTargets);
      if (newChosenTargets.has(el.value)) {
        newChosenTargets.delete(el.value);
      } else {
        newChosenTargets.add(el.value);
      }
      return newChosenTargets;
    });
  }, []);

  const memoizedTargets = useMemo(
    () =>
      targets.map((el) => (
        <ClickableTab key={el.value} onClick={() => handleClick(el)} isActive={chosenTargets.has(el.value)}>
          {t(el.value)}
        </ClickableTab>
      )),
    [t, targets, chosenTargets, handleClick],
  );

  return (
    <CardContainer>
      <CardName>{t('default_type_filter')}</CardName>
      <BaseColumnContainer>
        {memoizedTargets}
        <RightSideContainer>
          <Button onClick={switchTypeFilter} isActive={isTypeFilterEnabled}>
            {isTypeFilterEnabled ? t('default_enabled') : t('default_disabled')}
          </Button>
        </RightSideContainer>
      </BaseColumnContainer>
    </CardContainer>
  );
});
