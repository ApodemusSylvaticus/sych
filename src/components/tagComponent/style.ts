import styled from 'styled-components';
import { ClickableTabCss } from '../clickableTab/style.ts';

export const ChosenContainer = styled.div`
  color: rgb(${(props) => props.theme.colors.tabHover});
  background-color: rgba(${(props) => props.theme.colors.tabHover}, 0.3);

  ${ClickableTabCss};
  cursor: auto;
  font-weight: 500;
  font-family: Lato-Bold, system-ui, Avenir, Helvetica, Arial, sans-serif;
`;
