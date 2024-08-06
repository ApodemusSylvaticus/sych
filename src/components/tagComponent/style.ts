import styled from 'styled-components';
import { ClickableTabCss } from '../clickableTab/style.ts';

export const ChosenContainer = styled.div`
  background: ${(props) => props.theme.colors.accent};
  ${ClickableTabCss};
`;
