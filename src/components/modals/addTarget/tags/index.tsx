import React, { useCallback, useEffect, useState } from 'react';
import { CardName, ChosenTagContainer, Container, LastElemWrapper, TagsListContainer } from './style.ts';
import { ChosenTagComponent, TagComponent } from '../../../tagComponent';
import { useTagsStore } from '../../../../store/tags.ts';
import { WithButtonInput } from '../../../input/withButtonInput.tsx';
import { useTranslation } from 'react-i18next';

export const Tags: React.FC<{ tags: string[]; setTags: (value: string[]) => void }> = ({ tags, setTags }) => {
  const tagsList = useTagsStore((state) => state.tagsList);
  const addTag = useTagsStore((state) => state.addTag);
  const [selectedList, setSelectedList] = useState<string[]>(tags);
  const [inputValue, setInputValue] = useState<string>('');
  const { t } = useTranslation();

  useEffect(() => {
    setSelectedList(tags);
  }, [tags]);

  useEffect(() => {
    setTags(selectedList);
  }, [selectedList]);

  const tagComponentClick = useCallback(
    (value: string) => {
      const index = selectedList.indexOf(value);
      if (index === -1) {
        setSelectedList([value, ...selectedList]);
      } else {
        setSelectedList([...selectedList.filter((el) => el !== value)]);
      }
    },
    [selectedList],
  );
  const onWithButtonInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }, []);

  const handleAddValue = () => {
    const value = inputValue.trim();
    const index = selectedList.indexOf(value);
    if (index === -1 && value !== '') {
      addTag(inputValue);
      setSelectedList((prev) => [inputValue, ...prev]);
    }
    setInputValue('');
  };

  return (
    <Container>
      <CardName>{t('default_tag_section')}</CardName>
      {selectedList.length > 0 && (
        <ChosenTagContainer>
          {selectedList.map((value, index) => {
            if (index === selectedList.length - 1) {
              return (
                <LastElemWrapper>
                  <ChosenTagComponent value={value} />
                </LastElemWrapper>
              );
            }
            return <ChosenTagComponent value={value} />;
          })}
        </ChosenTagContainer>
      )}

      <WithButtonInput
        id={'aasda'}
        value={inputValue}
        onChange={onWithButtonInputChange}
        buttonLabel={t('default_add')}
        label={t('default_add_new_tag')}
        onButtonClick={handleAddValue}
      />
      <TagsListContainer>
        {tagsList.map((value, index) => {
          if (index === tagsList.length - 1) {
            return (
              <LastElemWrapper>
                <TagComponent isActive={selectedList.includes(value)} value={value} onClick={tagComponentClick} />
              </LastElemWrapper>
            );
          }
          return <TagComponent isActive={selectedList.includes(value)} value={value} onClick={tagComponentClick} />;
        })}
      </TagsListContainer>
    </Container>
  );
};
