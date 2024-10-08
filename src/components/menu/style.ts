import styled, { css, keyframes } from 'styled-components';
import { Button } from '../button/style.ts';
import { ScrollBarCss } from '../scrollbar/style.ts';

export const SubmitButton = styled(Button)`
  background-color: rgb(${(props) => props.theme.colors.tabActive});
  border-width: 2px;
`;

interface IMenuButtonContainer {
  isActive: boolean;
}

export const Container = styled.div<IMenuButtonContainer>`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 49px 8px 16px;
  width: 340px;
  height: 100%;
  background: rgb(${(props) => props.theme.colors.menuBg});
  transition: all 0.3s linear;
  transform-origin: right center;
  transform: ${(props) => (props.isActive ? 'translateX(0)' : 'translateX(100%)')};
  overflow: auto;

  ${ScrollBarCss};
`;

export const MenuButtonContainer = styled.div<IMenuButtonContainer>`
  padding: 8px;
  width: 40px;
  height: 33px;
  position: absolute;
  z-index: 10;
  top: 8px;
  right: 16px;
  border-radius: 8px;
  background: rgb(${(props) => props.theme.colors.menuBg});
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.1);

      & div {
        background: rgba(${(props) => props.theme.colors.primary}, 0.8);
      }
    }
  }
  @media (hover: none) {
    &:active {
      box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.1);

      & div {
        background: rgba(${(props) => props.theme.colors.primary}, 0.8);
      }
    }
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
  background: rgb(${(props) => props.theme.colors.primary});
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
