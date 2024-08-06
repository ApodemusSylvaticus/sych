import React, { useCallback, useMemo, useState } from 'react';
import { ClickableTab } from '../../clickableTab/style.ts';
import { BaseColumnContainer, BaseRowContainer, BaseRowContainerWithWrap } from '../../containers/style.ts';
import { useTagsStore } from '../../../store/tags.ts';
import { CardContainer } from '../../containers/cardStyle.ts';
import { Button, CardName, RightSideContainer } from '../style.ts';

export const TagsFilter: React.FC = React.memo(() => {
  const tagsList = useTagsStore((state) => state.tagsList);

  const [chosenTargets, setChosenTargets] = useState(tagsList);

  const handleClick = useCallback((el) => {
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
      <CardName>Tags filter</CardName>
      <BaseRowContainerWithWrap>{memoizedTargets}</BaseRowContainerWithWrap>
      <RightSideContainer>
        <Button isActive>Enable</Button>
      </RightSideContainer>
    </CardContainer>
  );
});
