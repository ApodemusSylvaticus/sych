import styled from 'styled-components';

export const OpacityFullSizeContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
`;

export const FullSizeModalContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
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
  border-radius: 16px;
  background: ${(props) => props.theme.colors.primary};
  position: relative;
  z-index: 2;
  padding: 16px;
  overflow: auto;
`;

export const Button = styled.button`
  background: ${(props) => props.theme.colors.secondary};
  outline: none;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 16px;

  transition: background-color 0.2s linear;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.colors.accent};
  }
`;
