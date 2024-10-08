import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ClickableTab } from '../../clickableTab/style.ts';
import { BaseRowContainerWithWrap } from '../../containers/style.ts';
import { useTagsStore } from '../../../store/tags.ts';
import { CardContainer } from '../../containers/cardStyle.ts';
import { Button, CardName, RightSideContainer } from '../style.ts';
import { useFilterStore } from '../../../store/filter.ts';
import { useTranslation } from 'react-i18next';

export const TagsFilter: React.FC = React.memo(() => {
  const tagsList = useTagsStore((state) => state.tagsList);
  const { addTagFilter, isTagFilterEnabled, switchTagFilter } = useFilterStore((state) => ({
    addTagFilter: state.addTagFilter,
    isTagFilterEnabled: state.isTagFilterEnabled,
    switchTagFilter: state.switchTagFilter,
  }));
  const { t } = useTranslation();
  const [chosenTargets, setChosenTargets] = useState(tagsList);

  useEffect(() => {
    addTagFilter(chosenTargets);
  }, [addTagFilter, chosenTargets]);

  const handleClick = useCallback((el: string) => {
    setChosenTargets((prevChosenTargets) => {
      const index = prevChosenTargets.indexOf(el);
      if (index === -1) {
        return [...prevChosenTargets, el];
      }
      return prevChosenTargets.filter((value) => value !== el);
    });
  }, []);

  const memoizedTargets = useMemo(
    () =>
      tagsList.map((el) => (
        <ClickableTab key={el} onClick={() => handleClick(el)} isActive={chosenTargets.includes(el)}>
          {el}
        </ClickableTab>
      )),
    [chosenTargets, tagsList, handleClick],
  );

  return (
    <CardContainer>
      <CardName>{t('default_tags_filter')}</CardName>
      <BaseRowContainerWithWrap>{memoizedTargets}</BaseRowContainerWithWrap>
      <RightSideContainer>
        <Button onClick={switchTagFilter} isActive={isTagFilterEnabled}>
          {isTagFilterEnabled ? t('default_enabled') : t('default_disabled')}
        </Button>
      </RightSideContainer>
    </CardContainer>
  );
});
