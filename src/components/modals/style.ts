import styled from 'styled-components';
import { Button } from '../button/style.ts';
import { CloseButton } from '../popup/rClick/style.ts';

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
  width: min(80%, 450px);
  max-height: 80%;
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

  @media (hover: hover) {
    &:hover {
      background-color: rgb(${(props) => props.theme.colors.tabHover});
    }
  }
`;

export const ImgContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.8rem;
`;

export const ImgCard = styled.img`
  object-fit: cover;
  width: 100%;
  aspect-ratio: 1/1;
`;

export const ImgWrapper = styled.div`
  position: relative;
`;

export const RemoveImgButton = styled(CloseButton)`
  top: 0;
  right: 0;
  background: rgb(${(props) => props.theme.colors.menuBg});
  border-radius: 0;
`;
