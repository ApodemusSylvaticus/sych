import styled from 'styled-components';

interface IContainer {
  x: number;
  y: number;
  isVisible: boolean;
}

export const Container = styled.div<IContainer>`
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.dialogs};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.6rem;
  gap: 0.8rem;
  width: 300px;

  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.3s linear;
  & span {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 8px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 24px;

  button {
    flex: 1;
    background-color: ${(props) => props.theme.colors.primary};
    border: none;
    border-radius: 4px;
    color: ${(props) => props.theme.colors.dialogs};
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    padding: 8px 16px;
    text-transform: uppercase;
    transition: background-color 0.3s;
  }

  button:hover {
    background: ${(props) => props.theme.colors.accent};
  }

  button:active {
    background: ${(props) => props.theme.colors.accent};
    border: none;
  }
`;
