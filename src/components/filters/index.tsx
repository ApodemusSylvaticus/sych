import React, { useEffect } from 'react';
import { TypeFilters } from './typeFilters';
import { TagsFilter } from './tagsFilter';
import { CardContainer } from '../containers/cardStyle.ts';
import { TimeFilter } from './timeFilter';
import { CardName, ColumnContainer } from './style.ts';
import { useFilterStore } from '../../store/filter.ts';
import { useMarkerStore } from '../../store/markers.ts';

export const Filters: React.FC = React.memo(() => {
  const { tagFilter, typeFilter, timeFilter, onlySession } = useFilterStore((state) => state);
  const { allMarkers, setFilteredMarkers, sessionMarkers } = useMarkerStore((state) => ({
    allMarkers: state.allMarkers,
    setFilteredMarkers: state.setFilteredMarkers,
    sessionMarkers: state.sessionMarkers,
  }));

  useEffect(() => {
    if (onlySession) {
      return;
    }
    console.log('a');
  }, [tagFilter, typeFilter, timeFilter, onlySession, sessionMarkers, allMarkers, setFilteredMarkers]);

  return (
    <CardContainer>
      <CardName>Filters</CardName>
      <ColumnContainer>
        <TypeFilters />
        <TagsFilter />
        <TimeFilter />
      </ColumnContainer>
    </CardContainer>
  );
});
