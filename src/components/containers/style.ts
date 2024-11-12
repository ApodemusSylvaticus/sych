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

export const WireGuardContainer = styled.form`
  width: 100dvw;
  min-height: 100dvh;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: rgb(${(props) => props.theme.colors.menuBg});
  padding: 2rem 1rem;
  gap: 3.2rem;
  transition: height 0.3s linear;
`;

export const WireGuardsFormsContainer = styled.div`
  display: flex;
  gap: 2.4rem;
  width: 100%;
  justify-content: stretch;
`;

export const WireGuardsButtonContainer = styled(BaseRowContainer)`
  justify-content: flex-end;
    gap: 2.4rem;
`;
