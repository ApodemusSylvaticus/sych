import styled from 'styled-components';
import { ClickableTab } from '../../../clickableTab/style.ts';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const Button = styled(ClickableTab)`
  padding: 0.8rem 1.2rem;
  font-size: 1.6rem;
`;
