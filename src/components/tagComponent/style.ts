import styled from 'styled-components';

export const Container = styled.div<{ isActive: boolean }>`
  padding: 6px 12px;
  border-radius: 4px;
  background: ${(props) => (props.isActive ? props.theme.colors.accent : props.theme.colors.secondary)};
  flex-grow: 1;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.25s linear;

  &:hover {
    background: ${(props) => (props.isActive ? props.theme.colors.accent : '#8E84A0')};
  }
`;

export const Text = styled.span``;

export const ChosenContainer = styled.div`
  padding: 6px 12px;
  border-radius: 4px;
  background: ${(props) => props.theme.colors.accent};
  flex-grow: 1;
  text-align: center;
`;
