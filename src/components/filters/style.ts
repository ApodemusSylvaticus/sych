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
  background-color: ${(props) => props.theme.colors.menuBg};
  color: ${(props) => props.theme.colors.primary};
`;

export const Button = styled(BaseButton)<IsActive>`
  background-color: ${(props) => (props.isActive ? 'darkred' : 'green')};
`;
