import styled from 'styled-components';
import { Button } from '../button/style.ts';

export const OpacityFullSizeContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
`;

export const FullSizeModalContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  z-index: 150;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.3s linear;
`;

export const ContentContainer = styled.div`
  width: min(60%, 450px);
  height: 70%;
  border-radius: 8px;
  background: rgb(${(props) => props.theme.colors.primary});
  position: relative;
  z-index: 2;
  padding: 1.6rem;
  overflow: auto;
`;

export const SaveButton = styled(Button)`
  color: rgb(${(props) => props.theme.colors.primary});
  background: rgb(${(props) => props.theme.colors.tabActive});

  &:hover {
    background: rgb(${(props) => props.theme.colors.tabHover});
  }
`;
