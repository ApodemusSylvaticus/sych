import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Button = styled.button<{ isSelected: boolean }>`
  background: ${(props) => (props.isSelected ? props.theme.colors.accent : props.theme.colors.secondary)};
  outline: none;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 16px;

  transition: background-color 0.2s linear;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.isSelected ? props.theme.colors.accent : '#8E84A0')};
  }
`;
