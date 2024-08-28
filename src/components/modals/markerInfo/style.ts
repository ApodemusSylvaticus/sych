import styled from 'styled-components';
import { ClickableTabCss } from '../../clickableTab/style.ts';
import { BaseColumnContainer } from '../../containers/style.ts';
import { Button } from '../../button/style.ts';

export const InvisibleComponent = styled(BaseColumnContainer)`
  position: absolute;
  padding: 1.6rem;
  opacity: 0;
  pointer-events: none;
  width: min(80%, 450px);
`;

export const ContentContainer = styled(BaseColumnContainer)`
  position: absolute;
  top: 0;
  left: 0;
  padding: 1.6rem;
  width: 100%;
  max-height: 100%;
  transition: opacity 0.15s linear;
  opacity: 0;
  overflow-y: auto;
  pointer-events: none;

  &.active {
    opacity: 1;
    pointer-events: auto;
    transition-delay: 0.15s;
  }

  &.inactive {
    opacity: 0;
    pointer-events: none;
    transition-delay: 0s;
  }
`;

export const Container = styled.div<{ height: number }>`
  background-color: rgb(${(props) => props.theme.colors.primary});
  z-index: 3;
  border-radius: 8px;
  min-width: min(80%, 450px);
  overflow: hidden;
  transition: height 0.3s linear;
  height: ${(props) => props.height}px;
  max-height: 70%;
  position: relative;
`;

export const Type = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: rgb(${(props) => props.theme.colors.menuBg});
  font-family: Lato-Bold, system-ui, Avenir, Helvetica, Arial, sans-serif;
`;

export const CoordSpan = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  color: rgb(${(props) => props.theme.colors.menuBg});
  font-family: Lato-Bold, system-ui, Avenir, Helvetica, Arial, sans-serif;
`;

export const TagTab = styled.div`
  ${ClickableTabCss};
  color: rgb(${(props) => props.theme.colors.tabHover});
  background-color: rgba(${(props) => props.theme.colors.tabHover}, 0.3);
  cursor: auto;
`;

export const ChangeButton = styled(Button)`
  margin-left: auto;
`;
