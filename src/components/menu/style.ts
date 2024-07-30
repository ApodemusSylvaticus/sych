import styled, { css, keyframes } from 'styled-components';

interface IMenuButtonContainer {
  isActive: boolean;
}

export const Container = styled.div<IMenuButtonContainer>`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  padding: ${(props) => (props.isActive ? '1.6rem' : '0')};
  width: ${(props) => (props.isActive ? '12%' : '0')};
  height: 100%;
  background: ${(props) => props.theme.colors.menuBg};
  border-left: ${(props) => (props.isActive ? '3px' : '0')} solid ${(props) => props.theme.colors.primary};
  transition: all 0.3s ease-in;
`;

export const MenuButtonContainer = styled.div<IMenuButtonContainer>`
  padding: 8px;
  width: 24px;
  height: 17px;
  position: absolute;
  z-index: 10;
  top: 8px;
  right: 8px;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.menuBg};
  cursor: pointer;
  &:hover div {
    background: ${(props) => props.theme.colors.accent};
  }

  &:hover {
    box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.1);
  }
`;

const activateAnimation = keyframes`
    0% {
        top: 8px;
        transform: rotate(0);
    }
    50% {
        top: 15px;
        transform: rotate(0);
    }
    100% {
        top: 15px;
        transform: rotate(45deg);
    }
`;

const deactivateAnimation = keyframes`
    0% {
        top: 15px;
        transform: rotate(45deg);
    }
    50% {
        top: 15px;
        transform: rotate(0);
    }
    100% {
        top: 8px;
        transform: rotate(0);
    }
`;

const LineBase = styled.div<{ isActive: boolean }>`
  background: ${(props) => props.theme.colors.primary};
  height: 3px;
  position: absolute;
  border-radius: 4px;
  width: 24px;
  left: 8px;
  transition: background ease 0.3s;
`;

export const FirstLine = styled(LineBase)`
  animation: ${({ isActive }) =>
    isActive
      ? css`
          ${activateAnimation} 0.6s ease forwards
        `
      : css`
          ${deactivateAnimation} 0.6s ease forwards
        `};
`;

const fadeOutAnimation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const SecondLine = styled(LineBase)`
  top: 15px;
  animation: ${({ isActive }) =>
    isActive
      ? css`
          ${fadeOutAnimation} 0.3s ease forwards
        `
      : css`
          ${fadeInAnimation} 0.3s ease forwards
        `};
`;

const reverseActivateAnimation = keyframes`
  0% {
    top: 22px;
    transform: rotate(0);
  }
  50% {
    top: 15px;
    transform: rotate(0);
  }
  100% {
    top: 15px;
    transform: rotate(-45deg);
  }
`;

const reverseDeactivateAnimation = keyframes`
  0% {
    top: 15px;
    transform: rotate(-45deg);
  }
  50% {
    top: 15px;
    transform: rotate(0);
  }
  100% {
    top: 22px;
    transform: rotate(0);
  }
`;

export const ThirdLine = styled(LineBase)`
  animation: ${({ isActive }) =>
    isActive
      ? css`
          ${reverseActivateAnimation} 0.6s ease forwards
        `
      : css`
          ${reverseDeactivateAnimation} 0.6s ease forwards
        `};
`;
