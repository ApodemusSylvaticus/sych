import styled from 'styled-components';

export const MainContainer = styled.div`
  position: relative;
  width: 100dvw;
  height: 100dvh;
  overflow: hidden;
  display: flex;
`;

export const BaseColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const BaseRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
`;

export const BaseRowContainerWithWrap = styled(BaseRowContainer)`
  flex-wrap: wrap;
`;
