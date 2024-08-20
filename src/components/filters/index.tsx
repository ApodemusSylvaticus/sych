import React, { useEffect } from 'react';
import { TypeFilters } from './typeFilters';
import { TagsFilter } from './tagsFilter';
import { CardContainer } from '../containers/cardStyle.ts';
import { TimeFilter } from './timeFilter';
import { ColumnContainer, MainCardName } from './style.ts';
import { useFilterStore } from '../../store/filter.ts';
import { IMarker, useMarkerStore } from '../../store/markers.ts';
import { useTranslation } from 'react-i18next';

export function filterMarkers(
  markers: IMarker[],
  tagFilterArray: string[],
  typeFilterArray: string[],
  timeFilter: {
    from: number;
    to: number;
  },
  useTagFilter: boolean = false,
  useTypeFilter: boolean = false,
  useTimeFilter: boolean = false,
) {
  console.log('markers', markers);

  let filteredMarkers = markers;

  // Фильтр по тегам
  if (useTagFilter) {
    filteredMarkers = filteredMarkers.filter((marker) => {
      if (tagFilterArray.length === 0) {
        return marker.tags.length === 0;
      } else {
        return marker.tags.length > 0 && marker.tags.some((tag) => tagFilterArray.includes(tag));
      }
    });
  }

  // Фильтр по типу
  if (useTypeFilter) {
    if (typeFilterArray.length === 0) {
      filteredMarkers = [];
    } else {
      filteredMarkers = filteredMarkers.filter((marker) => typeFilterArray.includes(marker.target.value));
    }
  }

  // Временной фильтр
  if (useTimeFilter) {
    filteredMarkers = filteredMarkers.filter((marker) => {
      if (timeFilter.from !== -1 && timeFilter.to !== -1) {
        return marker.timeStamp >= timeFilter.from && marker.timeStamp <= timeFilter.to;
      } else if (timeFilter.from !== -1) {
        return marker.timeStamp >= timeFilter.from;
      } else if (timeFilter.to !== -1) {
        return marker.timeStamp <= timeFilter.to;
      }
      return true;
    });
  }
  console.log('filteredMarkers', filteredMarkers);

  return filteredMarkers;
}
export const Filters: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const { tagFilter, typeFilter, timeFilter, onlySession, isTimeFilterEnabled, isTypeFilterEnabled, isTagFilterEnabled } = useFilterStore(
    (state) => state,
  );
  const { allMarkers, setFilteredMarkers, sessionMarkers } = useMarkerStore((state) => ({
    allMarkers: state.allMarkers,
    setFilteredMarkers: state.setFilteredMarkers,
    sessionMarkers: state.sessionMarkers,
  }));

  useEffect(() => {
    const filtered = onlySession
      ? filterMarkers(sessionMarkers, tagFilter, typeFilter, { from: -1, to: -1 }, isTagFilterEnabled, isTypeFilterEnabled, isTimeFilterEnabled)
      : filterMarkers(allMarkers, tagFilter, typeFilter, timeFilter, isTagFilterEnabled, isTypeFilterEnabled, isTimeFilterEnabled);
    setFilteredMarkers(filtered);
  }, [
    tagFilter,
    typeFilter,
    timeFilter,
    onlySession,
    sessionMarkers,
    allMarkers,
    setFilteredMarkers,
    isTimeFilterEnabled,
    isTypeFilterEnabled,
    isTagFilterEnabled,
  ]);

  return (
    <CardContainer>
      <MainCardName>{t('default_filters')}</MainCardName>
      <ColumnContainer>
        <TypeFilters />
        <TagsFilter />
        <TimeFilter />
      </ColumnContainer>
    </CardContainer>
  );
});
