import styled from 'styled-components';
import { ClickableTabCss } from '../clickableTab/style.ts';

export const ChosenContainer = styled.div`
  ${ClickableTabCss};
  color: rgb(${(props) => props.theme.colors.tabHover});
  background-color: rgba(${(props) => props.theme.colors.tabHover}, 0.3);
  cursor: auto;
  font-weight: 500;
`;
