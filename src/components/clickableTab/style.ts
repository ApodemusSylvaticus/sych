import styled, { css } from 'styled-components';
import { IsActive } from '../../interface/baseComponentsInterface.ts';

export const ClickableTabCss = css`
  padding: 6px 12px;
  border-radius: 4px;
  flex-grow: 1;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.25s linear;
`;

export const ClickableTab = styled.div<IsActive>`
  ${ClickableTabCss};
  background: ${(props) => (props.isActive ? props.theme.colors.accent : props.theme.colors.secondary)};
  &:hover {
    background: ${(props) => (props.isActive ? props.theme.colors.accent : '#8E84A0')};
  }
`;
