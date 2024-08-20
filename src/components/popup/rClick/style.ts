import styled from 'styled-components';

interface IWrapper {
  x: number;
  y: number;
  isVisible: boolean;
  arrowX: number;
  arrowY: number;
  isTopView: boolean;
  maxW: number;
}

export const Wrapper = styled.div<IWrapper>`
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  display: flex;
  flex-direction: column;
  background-color: rgb(${(props) => props.theme.colors.menuBg});
  padding: 1.6rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  gap: 0.8rem;
  width: 330px;
  pointer-events: ${(props) => (props.isVisible ? 'auto' : 'none')};

  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.3s linear;
  & span {
    color: rgb(${(props) => props.theme.colors.primary});
  }

  border-radius: ${(props) => {
    if (props.arrowX <= 10) {
      return props.isTopView ? '0 8px 8px 8px' : '8px 8px 8px 0';
    }
    if (props.maxW - props.arrowX <= 10) {
      return props.isTopView ? '8px 0 8px 8px' : '8px 8px 0 8px';
    }
    return '8px 8px 8px 8px';
  }};

  &::after {
    content: ' ';
    position: absolute;
    top: ${(props) => props.arrowY}px;
    left: ${(props) => props.arrowX}px;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${(props) =>
      props.isTopView
        ? `transparent  transparent rgb(${props.theme.colors.menuBg}) transparent`
        : `rgb(${props.theme.colors.menuBg}) transparent transparent transparent`};
  }
`;

export const CloseButton = styled.div`
  width: 3.2rem;
  height: 3.2rem;
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;

  transition: background-color 0.2s;

  &:before,
  &:after {
    position: absolute;
    content: '';
    width: 2.4rem;
    height: 2px;
    border-radius: 4px;
    background-color: rgb(${(props) => props.theme.colors.primary});
  }
  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(135deg);
  }

  &:hover {
    background-color: rgba(${(props) => props.theme.colors.tabHover}, 0.8);
  }
`;

export const PaddingContainer = styled.div`
  padding: 0 1.6rem;
  gap: 0.8rem;
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
`;

export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background: rgb(${(props) => props.theme.colors.tabDefault});
  border-radius: 8px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 2.4rem;
  & button {
    flex: 1;
  }
`;
