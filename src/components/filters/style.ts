import styled from 'styled-components';
import { BaseColumnContainer } from '../containers/style.ts';
import { CardName as CardNameBase } from '../containers/cardStyle.ts';
import { Button as BaseButton } from '../button/style.ts';
import { IsActive } from '../../interface/baseComponentsInterface.ts';

export const ColumnContainer = styled(BaseColumnContainer)`
  gap: 16px;
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
  font-size: 20px;
`;

export const Button = styled(BaseButton)<IsActive>`
  border: 1px solid rgb(${(props) => props.theme.colors.primary});
  background-color: ${(props) => (props.isActive ? `rgb(${props.theme.colors.tabActive})` : `rgb(${props.theme.colors.tabDefault})`)};
`;
