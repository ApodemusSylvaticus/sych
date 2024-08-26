import styled from 'styled-components';
import { ClickableTabCss } from '../../clickableTab/style.ts';
import { BaseColumnContainer } from '../../containers/style.ts';

export const Container = styled(BaseColumnContainer)`
  background-color: rgb(${(props) => props.theme.colors.primary});
  padding: 1.6rem;
  z-index: 3;
  border-radius: 8px;
  min-width: min(80%, 320px);
`;

export const Type = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  font-family: Lato-Bold, system-ui, Avenir, Helvetica, Arial, sans-serif;
`;

export const CoordSpan = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  font-family: Lato-Bold, system-ui, Avenir, Helvetica, Arial, sans-serif;
`;

export const TagTab = styled.div`
  ${ClickableTabCss};
  color: rgb(${(props) => props.theme.colors.tabHover});
  background-color: rgba(${(props) => props.theme.colors.tabHover}, 0.3);
  cursor: auto;
`;
