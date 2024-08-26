import React, { useEffect } from 'react';
import { TypeFilters } from './typeFilters';
import { TagsFilter } from './tagsFilter';
import { TimeFilter } from './timeFilter';
import { ColumnContainer, Container, MainCardName } from './style.ts';
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
    console.log(timeFilter);
    filteredMarkers = filteredMarkers.filter((marker) => {
      console.log('--marker--', new Date(marker.timeStamp));
      console.log('--from--', new Date(timeFilter.from));
      console.log('--to--', new Date(timeFilter.to));
      const markerDate = new Date(marker.timeStamp);
      if (timeFilter.from !== -1 && timeFilter.to !== -1) {
        return markerDate >= new Date(timeFilter.from) && markerDate <= new Date(timeFilter.to);
      } else if (timeFilter.from !== -1) {
        return markerDate >= new Date(timeFilter.from);
      } else if (timeFilter.to !== -1) {
        return markerDate <= new Date(timeFilter.to);
      }
      return true;
    });
  }

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
      ? filterMarkers(sessionMarkers, tagFilter, typeFilter, { from: -1, to: -1 }, isTagFilterEnabled, isTypeFilterEnabled, false)
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
    <Container>
      <MainCardName>{t('default_filters')}</MainCardName>
      <ColumnContainer>
        <TypeFilters />
        <TagsFilter />
        <TimeFilter />
      </ColumnContainer>
    </Container>
  );
});
