import styled from 'styled-components';
import { BaseColumnContainer } from '../containers/style.ts';
import { CardContainer, CardName as CardNameBase } from '../containers/cardStyle.ts';
import { Button as BaseButton } from '../button/style.ts';
import { IsActive } from '../../interface/baseComponentsInterface.ts';

export const ColumnContainer = styled(BaseColumnContainer)`
  gap: 1.6rem;
`;

export const Container = styled(CardContainer)`
  margin-top: 4px;
`;

export const RightSideContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CardName = styled(CardNameBase)`
  background-color: rgb(${(props) => props.theme.colors.menuBg});
  color: rgb(${(props) => props.theme.colors.primary});
`;

export const MainCardName = styled(CardName)`
  font-size: 2.2rem;
`;

export const Button = styled(BaseButton)<IsActive>`
  border: 1px solid rgb(${(props) => props.theme.colors.primary});
  background-color: ${(props) => (props.isActive ? `rgb(${props.theme.colors.tabActive})` : `rgb(${props.theme.colors.tabDefault})`)};
`;
