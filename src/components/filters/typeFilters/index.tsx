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
  const addTypeFilter = useFilterStore((state) => state.addTypeFilter);
  const [chosenTargets, setChosenTargets] = useState(() => new Set(targets.map((t) => t.value)));
  const [isFilterAvailable, setIsFilterAvailable] = useState<boolean>(false);
  const { t } = useTranslation();
  useEffect(() => {
    if (isFilterAvailable) {
      const typeFilterArray = Array.from(chosenTargets);
      addTypeFilter(typeFilterArray);
    } else {
      addTypeFilter([]);
    }
  }, [addTypeFilter, chosenTargets, isFilterAvailable]);

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
          <Button onClick={() => setIsFilterAvailable(!isFilterAvailable)} isActive={isFilterAvailable}>
            {isFilterAvailable ? t('default_enabled') : t('default_disabled')}
          </Button>
        </RightSideContainer>
      </BaseColumnContainer>
    </CardContainer>
  );
});
