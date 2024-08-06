import styled from 'styled-components';
import { ClickableTab } from '../../../clickableTab/style.ts';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Button = styled(ClickableTab)`
  padding: 8px 12px;
  font-size: 16px;
`;
