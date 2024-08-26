import styled, { css } from 'styled-components';
import { IsActive } from '../../interface/baseComponentsInterface.ts';

export const ClickableTabCss = css`
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  flex-grow: 1;
  font-size: 1.6rem;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.25s linear;

  @media (max-width: 500px) {
    font-size: 1.8rem;
  }
`;

export const ClickableTab = styled.div<IsActive>`
  ${ClickableTabCss};
  background: rgb(${(props) => (props.isActive ? props.theme.colors.tabActive : props.theme.colors.tabDefault)});
  color: rgb(${(props) => props.theme.colors.primary});

  @media (hover: hover) {
    &:hover {
      background-color: rgb(${(props) => props.theme.colors.tabHover});
    }
  }
`;
