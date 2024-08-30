import styled from 'styled-components';
import { BaseColumnContainer, BaseRowContainer } from '../../containers/style.ts';
import { CardName } from '../../filters/style.ts';

export const Container = styled(BaseColumnContainer)`
  gap: 1.6rem;
`;

export const TextFieldsContainer = styled(BaseRowContainer)`
  border-radius: 8px;
  border: 1px solid gray;
  padding: 1.8rem 0.4rem 1.2rem;
  position: relative;
`;

export const ContainerCardName = styled(CardName)``;

export const ManagerContainer = styled.div`
  border-radius: 8px;
  border: 1px solid rgb(${(props) => props.theme.colors.primary});
  padding: 1.8rem 0.4rem 1.2rem;
  position: relative;
  gap: 0.8rem;
  display: flex;
  flex-direction: column;
`;

export const ImgCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.8rem;
`;

interface ImgCardProps {
  backgroundImage: string;
}

export const ImgCard = styled.div<ImgCardProps>`
  aspect-ratio: 1 / 1;
  width: 100%;
  background-image: ${(props) => `url(${props.backgroundImage})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 4px;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  position: relative;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: scale(1.05);
    }
  }
`;

export const ImgCardDisabledTab = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(${(props) => props.theme.colors.menuBg}, 0.6);
  color: rgba(${(props) => props.theme.colors.primary}, 0.8);
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
`;
