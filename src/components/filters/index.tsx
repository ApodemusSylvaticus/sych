import React, { useEffect } from 'react';
import { TypeFilters } from './typeFilters';
import { TagsFilter } from './tagsFilter';
import { CardContainer } from '../containers/cardStyle.ts';
import { TimeFilter } from './timeFilter';
import { ColumnContainer, MainCardName } from './style.ts';
import { useFilterStore } from '../../store/filter.ts';
import { IMarker, useMarkerStore } from '../../store/markers.ts';

export function filterMarkers(
  markers: IMarker[],
  tagFilterArray: string[],
  typeFilterArray: string[],
  timeFilter: {
    from: number;
    to: number;
  },
) {
  return markers.filter((marker) => {
    const tagMatch = tagFilterArray.length === 0 || tagFilterArray.some((tag) => marker.tags.includes(tag));
    if (!tagMatch) {
      return false;
    }
    const typeMatch = typeFilterArray.length === 0 || typeFilterArray.includes(marker.target.value);
    if (!typeMatch) {
      return false;
    }

    let timeMatch = true;
    if (timeFilter.from !== -1 && timeFilter.to !== -1) {
      timeMatch = marker.timeStamp >= timeFilter.from && marker.timeStamp <= timeFilter.to;
    } else if (timeFilter.from !== -1) {
      timeMatch = marker.timeStamp >= timeFilter.from;
    } else if (timeFilter.to !== -1) {
      timeMatch = marker.timeStamp <= timeFilter.to;
    }

    return timeMatch;
  });
}

export const Filters: React.FC = React.memo(() => {
  const { tagFilter, typeFilter, timeFilter, onlySession } = useFilterStore((state) => state);
  const { allMarkers, setFilteredMarkers, sessionMarkers } = useMarkerStore((state) => ({
    allMarkers: state.allMarkers,
    setFilteredMarkers: state.setFilteredMarkers,
    sessionMarkers: state.sessionMarkers,
  }));

  useEffect(() => {
    const filtered = onlySession
      ? filterMarkers(sessionMarkers, tagFilter, typeFilter, timeFilter)
      : filterMarkers(allMarkers, tagFilter, typeFilter, timeFilter);
    setFilteredMarkers(filtered);
  }, [tagFilter, typeFilter, timeFilter, onlySession, sessionMarkers, allMarkers, setFilteredMarkers]);

  return (
    <CardContainer>
      <MainCardName>Filters</MainCardName>
      <ColumnContainer>
        <TypeFilters />
        <TagsFilter />
        <TimeFilter />
      </ColumnContainer>
    </CardContainer>
  );
});
