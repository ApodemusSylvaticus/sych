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
  background: rgb(${(props) => (props.isActive ? props.theme.colors.tabActive : props.theme.colors.tabDefault)});
  color: rgb(${(props) => props.theme.colors.primary});
  &:hover {
    background: rgb(${(props) => props.theme.colors.tabHover});
  }
`;
